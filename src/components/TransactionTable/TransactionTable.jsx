import { Radio, Select, Table } from 'antd';
import { Option } from 'antd/es/mentions';

import React, { useState } from 'react'


const TransactionTable = ({transaction}) => {
    const [search,setsearch] = useState("");
     const [typefilter,setTypeFilter] = useState("")
     const [sortKey,setSortKey] =useState("")
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
       
          {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
      ];

      const filteredData = transaction.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())&&
      item.type.includes(typefilter)
      )

      const sortedTransactions = [...filteredData].sort((a,b)=>{
        if(sortKey==="date"){
            return new Date(a.date) - Date(b.date);
        }
        else if(sortKey==="amount"){
            return a.amount - b.amount
        }
        else{
            return 0;
        }
      
      })
      const dataSource = sortedTransactions.map((transaction, index) => ({
        key: index,
        ...transaction,
      }));
  return (
    <div>
        <input  value={search}
        onChange={(e) => setsearch(e.target.value)}
        placeholder='search here'
        />
         <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typefilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>

        <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
      <Table dataSource={dataSource } columns={columns} />;
    </div>
  )
}

export default TransactionTable
