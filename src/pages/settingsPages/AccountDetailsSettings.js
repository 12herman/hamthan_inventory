import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Table, message, Modal, Input, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getaccount } from "../../redux/slices/accountdetailsSlice";
import { getEmployees } from "../../redux/slices/employeeSlice";

const AccountDetailSettings = ({ BackToSetting }) => {


    const columns = [
        {
            title: 'S.No',
            dataIndex: 'serialno',
            width: '5%',
        },
        {
            title: 'Employee Name',
            dataIndex: 'employeeid',
            width: '25%',
        },
        {
            title: 'Bank Location',
            dataIndex: 'bankLocation',
            width: '25%',
        },
        {
            title: 'Account No',
            dataIndex: 'accountNumber',
            width: '15%',
        },
        {
            title: 'IFSC',
            dataIndex: 'ifsc',
            width: '20%',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => (

                <div className="flex gap-x-2">
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                        onConfirm={() => Delete(record.key)}
                    >
                        <Button><FontAwesomeIcon icon={faTrash} /></Button>
                    </Popconfirm>

                    <Button onClick={() => Edit(record.key)}><FontAwesomeIcon icon={faPen} /></Button>

                </div>

            ),
        },
    ];

    const dispatch = useDispatch();
    const {account} = useSelector(state => state.account);
    const {employee} =useSelector(state => state.employee);
    
    const [datas,setDatas] = useState([]);
    const [emdata,setEmdata] = useState([]);

    useEffect(()=>{
        dispatch(getEmployees());
        dispatch(getaccount());
        setEmdata(employee);
        setDatas(account);
    },[dispatch])

    console.log( datas);
    console.log(emdata);
    
    
    const accountWithName = datas.map(acc => {
        const employee = emdata.find(emp => emp.id === acc.employeeId);
        return employee
    });
    accountWithName.map(el=> {console.log(el.firstName +" " + el.lastName)});

    //Table Datas
    const TableDatas = datas.map((data,i)=>({
        key:data.id,
        serialno: i+1,
        employeeid:data.employeeId,
        bankLocation:data.bankLocation,
        accountNumber:data.accountNumber,
        ifsc:data.ifsc,
    }));


    const Edit = () => {
        console.log("Edit");
    };
    const Delete = () => {
        console.log("Delete");
    }



    return (
        <>
            <div className="flex items-center justify-between" >
                <h2>AccountDetail Settings</h2>
                <Button style={{ float: "right" }} onClick={() => BackToSetting()}> Back</Button>
            </div>

            <Table
                style={{ marginTop: 10 }}
                bordered
                columns={columns}
                dataSource={TableDatas}
            pagination={{
                pageSize: 6
            }}
            />
        </>
    )
}
export default AccountDetailSettings