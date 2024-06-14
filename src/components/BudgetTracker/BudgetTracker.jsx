import React, { useEffect } from 'react';
import { Form, Input, Button, Progress, Card } from 'antd';
import "./style.css"

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
    <div className='budget-wrapper'>
       <Card className=' budget-card'>
      <div>
        <h2 style={{fontWeight:"600"}}>Set Your Budget</h2>
      </div>
     
      <Form className="budget-form" layout="inline" form={form} onFinish={handleSubmit}>
        <Form.Item label="Monthly Budget" name="budget" rules={[{ required: true, message: 'Please enter your budget' }]}>
          <Input className='budget-input' type="number" placeholder="Enter budget" />
        </Form.Item>
        <Form.Item>
          <Button className='budget-btn' type="primary" htmlType="submit">Set Budget</Button>
        </Form.Item>
      </Form>
      <Progress percent={progressPercent} status={progressPercent > 100 ? 'exception' : 'active'} />
     <div>
       <p> <span style={{fontWeight:"500"}}>Budget: </span> <span >₹</span>{budget}</p>
      <p><span style={{fontWeight:"500"}}>Spent:</span> ₹{totalSpent}</p>
     </div>
     </Card>
    </div>
  );
};

export default BudgetTracker;
