import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import CountUp  from 'react-countup';
import {useDispatch,useSelector} from 'react-redux';
import { getEmployees } from '../redux/slices/employeeSlice';
import { fetchOfficeData } from '../redux/slices/officeSlice';

const formatter = (value) => <CountUp end={value} />;

const Dashboard = ({officeData}) => {

const dispatch = useDispatch();
const {employee,loading} = useSelector(state => state.employee);

const [empData,setEmpData] = useState([]);
const [empCounts,setEmpCounts] = useState();


useEffect(()=>{
    dispatch(getEmployees());
},[]);

useEffect(()=>{
        setEmpData(employee);
        DataLoading();
},[employee,officeData]);


function DataLoading() {
    var numberOfOffice = officeData.filter((off) => off.officename);
    var officeNames = numberOfOffice.map((off) => {
      return off.officename;
    });

    if (officeNames.length === 1) {
      var filterOneOffice = empData.filter((off) => off.officeLocationId.officename === officeNames[0]);
      setEmpCounts(filterOneOffice.length);
    } else {
      setEmpCounts(empData.length);
    }
  }

    return (
        <div>
            <Row gutter={16}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Employee"
                            value={empCounts === undefined ? 1 : empCounts}
                            formatter={formatter} 
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
               
               
            </Row>
        </div>


    );
};
export default Dashboard;
