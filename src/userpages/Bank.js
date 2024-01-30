import React from 'react';
import { Col, Row } from 'antd';
import { Descriptions } from 'antd';


const items = [
  {
    key: '1',
    label: 'Account Holder Name',
    children: 'Abu',
  },
  {
    key: '2',
    label: 'Account Number',
    children: '04652250051',
  },
  {
    key: '3',
    label: 'Bank Name',
    children: 'ICICI Bank',
  },
  {
    key: '4',
    label: 'Branch',
    children: 'Thirunelveli',
  },
  {
    key: '5',
    label: 'IFSC Code',
    children: 'ICICI000128',
  }
]

const Bank = () => {
  return (
    <div>
      <Row>
        <Col span={24}><Descriptions
          title="Account Details"
          bordered
          layout='vertical'
          items={items}
        /></Col>
      </Row>
    </div>
  );
};

export default Bank;