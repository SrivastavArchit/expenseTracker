import { Radio, Select, Table } from 'antd';
import "./style.css";
import React, { useState } from 'react';

const { Option } = Select;

const TransactionTable = ({ transaction }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

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
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    item.type.includes(typeFilter)
  );

  const sortedTransactions = [...filteredData].sort((a, b) => {
    if (sortKey === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
  }));

  return (
    <div>
      <div className='tablewrap'>
        <input
          className='search-bar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by Name'
        />
        <h2>My Transactions</h2>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
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
          <Radio.Button value="name">Sort by Name</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
      </div>
      <Table
        className='table'
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 500 }} // Added scroll prop for horizontal scrolling
      />
    </div>
  );
};

export default TransactionTable;
