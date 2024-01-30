import React from 'react';
import { Col, Row } from 'antd';
import { Descriptions } from 'antd';

const items = [
  {
    key: '1',
    label: 'Name',
    children: 'Abu',
  },
  {
    key: '2',
    label: 'Age',
    children: '24',
  },
  {
    key: '3',
    label: 'Address',
    children: 'London',
  },
  {
    key: '4',
    label: 'Email',
    children: 'mdabu@gmail.com',
  },
  {
    key: '5',
    label: 'Phone',
    children: '9876543210',
  },
  {
    key: '6',
    label: 'Blood Group',
    children: 'A+',
  },
  {
    key: '7',
    label: 'Position',
    children: 'Python Developer',
  },
  {
    key: '8',
    label: 'Personal Email',
    children: 'mdabu@gmail.com',
  },
  {
    key: '9',
    label: 'Date of Birth',
    children: '01/04/1998',
  },
  {
    key: '10',
    label: 'Date of Joining',
    children: '01/05/2023',
  }
]

const Personal = () => {
  return (
    <div>
      <Row>
        <Col span={24}><Descriptions
          title="Details"
          bordered
          items={items}
        /></Col>
      </Row>
    </div>
  );
};

export default Personal;