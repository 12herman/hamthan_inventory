import React from 'react';
import { Descriptions,Row,Col } from 'antd';

const items = [
  {
    key: '1',
    label: 'Name',
    children: 'Abu',
  },
  {
    key: '2',
    label: 'System',
    children: 'Laptop',
  },
  {
    key: '3',
    label: 'Brand',
    children: 'Dell',
  },
  {
    key: '4',
    label: 'Model',
    children: 'DS5023M',
  },
  {
    key: '5',
    label: 'Keyboard',
    children: 'W239',
  },
  {
    key: '6',
    label: 'Headset',
    children: 'Logi',
  },
  {
    key: '7',
    label: 'Extra',
    children: 'Dell Monitor 27"',
  }
]

const System = () => {
 
  return (
    <div>
     <Row>
        <Col span={24}><Descriptions
          title="Accessories"
          bordered
          layout='vertical'
          items={items}
        /></Col>
      </Row>
    </div>
  );
};

export default System;