import React, { useEffect } from 'react';
import { Form, Input, Button, Progress } from 'antd';

const BudgetTracker = ({ transactions, budget, saveBudget }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (budget) {
      form.setFieldsValue({ budget });
    }
  }, [budget, form]);

  const handleSubmit = (values) => {
    saveBudget(parseFloat(values.budget));
  };

  const totalSpent = transactions.reduce((acc, transaction) => {
    return transaction.type === 'expense' ? acc + transaction.amount : acc;
  }, 0);

  const progressPercent = Math.ceil((totalSpent / budget) * 100);

  return (
    <div>
      <Form layout="inline" form={form} onFinish={handleSubmit}>
        <Form.Item label="Monthly Budget" name="budget" rules={[{ required: true, message: 'Please enter your budget' }]}>
          <Input type="number" placeholder="Enter budget" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Set Budget</Button>
        </Form.Item>
      </Form>
      <Progress percent={progressPercent} status={progressPercent > 100 ? 'exception' : 'active'} />
      <p>Budget: ${budget}</p>
      <p>Spent: ${totalSpent}</p>
    </div>
  );
};

export default BudgetTracker;
