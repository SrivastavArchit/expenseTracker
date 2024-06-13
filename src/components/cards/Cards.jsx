import React from 'react';
import { Card, Button } from 'antd';
import "./style.css"

const Cards = ({ showExpenseModal, showIncomeModal, income, expense, currentBalance ,resetBalance}) => {

  
  return (
    <div className="row">
      <Card className='my-card' title="Current Balance" style={{ width: 300 }}>
        <p className='amount' >${currentBalance}</p>
        <Button type="primary" onClick={resetBalance}>Reset Balance</Button>
      </Card>
      <Card className='my-card' title="Total Income" style={{ width: 300 }}>
        <p className='amount'>${income}</p>
        <Button type="primary" onClick={showIncomeModal}>Add Income</Button>
      </Card>
      <Card className='my-card' title="Total Expense" style={{ width: 300 }}>
        <p className='amount'>${expense}</p>
        <Button type="primary" onClick={showExpenseModal}>Add Expense</Button>
      </Card>
    </div>
  );
};

export default Cards;

