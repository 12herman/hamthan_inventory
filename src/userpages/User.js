import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faDesktop, faVault, faMoneyBill, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'antd';
import { Switch } from 'antd';

import UserDashboard from './UserDashboard';
import Personal from './Personal';
import Bank from './Bank';
import Pay from './Pay';
import System from './System';
import Holiday from './Holiday';

const { Header, Sider, Content } = Layout;

const User = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '1',
      icon: <FontAwesomeIcon icon={faHouse} />,
      label: 'Dashboard',
      Content: <UserDashboard />,
    },
    {
      key: '2',
      icon: <FontAwesomeIcon icon={faUser} />,
      label: 'Personal',
      Content: <Personal />,
    },
    {
      key: '3',
      icon: <FontAwesomeIcon icon={faVault} />,
      label: 'Bank Info',
      Content: <Bank />,
    },
    {
      key: '4',
      icon: <FontAwesomeIcon icon={faMoneyBill} />,
      label: 'Pay Details',
      Content: <Pay />,
    },
    {
      key: '5',
      icon: <FontAwesomeIcon icon={faDesktop} />,
      label: 'System Assigned',
      Content: <System />,
    },
    {
      key: '6',
      icon: <FontAwesomeIcon icon={faCalendarDays} />,
      label: 'Holiday Calender',
      Content: <Holiday />
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => handleMenuClick(menuItems.find((item) => item.key === key))}
          >
            {menuItems.map((item) => (
    <Menu.Item key={item.key} icon={item.icon}>
      {item.label}
    </Menu.Item>
  ))}
</Menu>
         
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            fontSize: '25px',
            fontWeight: 'bold',
          }}
        >
          <Row justify='space-between' align='middle'>
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '26px',
                  width: 64,
                  height: 64,
                }}
              />
              {selectedMenuItem ? selectedMenuItem.label : 'Dashboard'}
            </Col>
            <Col justify='flex-end' style={{ right: '1%' }}>
              <div>
               <Switch checkedChildren="Dark" unCheckedChildren="Light" defaultChecked />
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          className="custom-content"
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >{selectedMenuItem ? selectedMenuItem.Content : <UserDashboard />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default User;