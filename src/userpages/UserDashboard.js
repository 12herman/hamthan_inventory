import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import CountUp  from 'react-countup';
import { Progress,Flex,Button,Timeline,Divider } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const formatter = (value) => <CountUp end={value} />;

const UserDashboard = () => {
    return (
        <div>
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                    <Flex justify="space-between" align='center'>
                        <Statistic
                            title="Total Working Days"
                            value={172}
                            formatter={formatter} 
                            valueStyle={{
                                color: '#3f8600',
                                fontWeight:'bold',
                            }}
                        />
                        <Progress type="circle" percent={100} status="active" format={() => `172 Days`}/>
                        </Flex>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                    <Flex justify="space-between" align='center'>
                        <Statistic
                            title="Personal Leave"
                            value={12}
                            formatter={formatter} 
                            valueStyle={{
                                color: '#3f8600',
                                fontWeight:'bold',
                            }}
                        />
                        <Progress type="circle" percent={80} status="active" format={() => '10 Days'}/>
                        </Flex>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                    <Flex justify="space-between" align='center'>
                        <Statistic
                            title="Sick Leave"
                            value={12}
                            formatter={formatter} 
                            valueStyle={{
                                color: '#3f8600',
                                fontWeight:'bold',
                            }}
                        />
                        <Progress type="circle" percent={50} status="active" format={() => '6 Days'} />
                        </Flex>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                    <Flex justify="space-between" align='center'>
                        <Statistic
                            title="Comp Off"
                            value={1}
                            formatter={formatter} 
                            valueStyle={{
                                color: '#3f8600',
                                fontWeight:'bold',
                            }}
                        />
                        <Progress type="circle" percent={0} status="active" format={() => '0 Days'}/>
                        </Flex>
                    </Card>
                </Col>
            </Row>
            <Button type="primary" style={{marginTop: '20px'}}>Apply for Leave</Button>

            <Divider />
            <h2 style={{textAlign: 'center',marginBottom: '30px'}}>Office Holidays - 2024</h2>

            <Timeline
            mode='right'
      items={[
        {
            label: 'New Year',
            children: '01-01-2024',
        },
        {
            label: 'Pongal',
            children: '15-01-2024',
        },
        {
            label: 'Republic Day',
            children: '26-01-2024',
            dot: <SmileOutlined />,
        },
        {
            label: 'Ramzan',
            children: '11-04-2024',
            color: 'gray',
        },
        {
            label: 'May Day',
            children: '01-05-2024',
            color: 'gray',
        },
        {
            label: 'Bakrid',
            children: '17-06-2024',
            color: 'gray',
          },
          {
            label: 'Independence Day',
            children: '15-08-2024',
            color: 'gray',
          },
      ]}
    />

        </div>
    );
};

export default UserDashboard;
