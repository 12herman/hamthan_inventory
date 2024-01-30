import React from 'react';
import { Table,Space } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'October',
    age: 30000,
    address: 24640,
  },
  {
    key: '2',
    name: 'November',
    age: 30000,
    address: 24640,
  },
];

const columns = [
  {
    title: 'Month',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Gross Salary',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Net Salary',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Pay Slip',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href='#'>View</a>
      </Space>
    ),
  }
];

const Pay = () => {
 
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />   
    </div>
  );
};

export default Pay;