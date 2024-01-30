import { Button, Form, Table, message, Modal, Input, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOffice, deleteOfficeAsync, getOffice, updateOfficeAsync } from "../../redux/slices/officeSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';




const OfficeSettings = ({ BackToSetting }) => {

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'serialno',
            width: '5%',
        },
        {
            title: 'Office Name',
            dataIndex: 'officename',
            width: '25%',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '25%',
        },
        {
            title: 'City',
            dataIndex: 'city',
            width: '15%',
        },
        {
            title: 'State',
            dataIndex: 'state',
            width: '20%',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            width: '40%',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => (

                <div className="flex gap-x-2">
                    <Popconfirm
                        title="Are you sure to delete this office?"
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                        onConfirm={() => DleteOffice(record.key)}
                    >
                        <Button><FontAwesomeIcon icon={faTrash} /></Button>
                    </Popconfirm>

                    <Button onClick={() => EditOfficeIcon(record.key)}><FontAwesomeIcon icon={faPen} /></Button>

                </div>

            ),
        },
    ];

    const [popupBtnChange, setPopUpBtnChange] = useState(false);
    const [TableofficeData, setTableofficeData] = useState([]);
    const [newOfficePopup, setNewOfficePopup] = useState(false);
    const [officeField, setOfficeFileld] = useState({
            id: '',
            officename: '',
            address: '',
            city: '',
            state: '',
            country: '',
            isdeleted:true
    });

    const ClearFiled = () => {
        setOfficeFileld({
            id: '',
            officename: '',
            address: '',
            city: '',
            state: '',
            country: '',
        })
    };

    const dispatch = useDispatch();
    const { office } = useSelector(state => state.office)


    const handleOk = () => {
        ClearFiled();
        setNewOfficePopup(false);
        setPopUpBtnChange(false);
    };
    const handleCancel = () => {
        ClearFiled();
        setNewOfficePopup(false);
        setPopUpBtnChange(false);
    };

    const officeInputData = (e) => {
        const { name, value } = e.target;
        setOfficeFileld((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createNewOffice = () => {
        if (officeField.officename === "" ||
            officeField.address === "" ||
            officeField.city === "" ||
            officeField.country === "" ||
            officeField.state === "") {
            message.error("Fill all the fields");
        }
        else {
            dispatch(createOffice(officeField));
            message.success("New office created successfully");
            setNewOfficePopup(false)
            ClearFiled();
            setTableofficeData(office);
        }
    };

    const TbOfficeDataFilter = TableofficeData.length > 0 ? TableofficeData.filter(data => data.isdeleted === true) : [];

    const TbOfficeData = TbOfficeDataFilter.map((office, i) => ({
        key: office.id,
        serialno: i + 1,
        officename: office.officename,
        address: office.address,
        city: office.city,
        state: office.state,
        country: office.country,
        isdeleted: office.isdeleted
    }));


    const EditOfficeIcon = (key) => {
        console.log(key);
        var EditableData = TbOfficeData.filter(x => x.key === key);
        console.log(EditableData);
        setOfficeFileld({
            id: key,
            officename: EditableData[0].officename,
            address: EditableData[0].address,
            city: EditableData[0].city,
            state: EditableData[0].state,
            country: EditableData[0].country
        })
        setNewOfficePopup(true);
        setPopUpBtnChange(true);
    }


    const EditOffice = async () => {
        console.log("Hi edit");
        if (officeField.officename === "" ||
            officeField.address === "" ||
            officeField.city === "" ||
            officeField.country === "" ||
            officeField.state === "") {
            message.error("Fill all the fields");
        }
        else {
            console.log(officeField);
            const updatedOfficeData = {
                "id": officeField.id,
                "officename": officeField.officename,
                "address": officeField.address,
                "city": officeField.city,
                "state": officeField.state,
                "country": officeField.country,
                "isdeleted":true
            };
            console.log(updatedOfficeData);
            dispatch(updateOfficeAsync(updatedOfficeData));
            setOfficeFileld({
                id: '',
                officename: '',
                address: '',
                city: '',
                state: '',
                country: ''
            });
            setNewOfficePopup(false);
            message.success("save successfully")
        }
    }

    const DleteOffice = (key) => {
        // soft Delete
        var DeleteData = TbOfficeData.filter(x => x.key === key);
        console.log(DeleteData[0]);
        const IsFalseOffice = {
            id: key,
            officename: DeleteData[0].officename,
            address: DeleteData[0].address,
            city: DeleteData[0].city,
            state: DeleteData[0].state,
            country: DeleteData[0].country,
            isdeleted: false
        };
        console.log(IsFalseOffice);
        dispatch(updateOfficeAsync(IsFalseOffice));
        message.success("Office deleted successfully");
        
        // // Hard Delete
        // dispatch(deleteOfficeAsync(key));
        // message.success("Office deleted successfully")
       
    }

    useEffect(() => {
        dispatch(getOffice());
    }, [dispatch]);

    useEffect(() => {
        setTableofficeData(office);
    }, [DleteOffice, dispatch, EditOffice]);




    return (
        <>
            <div className="flex items-center justify-between mb-5" >
                <h2>Office Settings</h2>
                <Button style={{ float: "right" }} onClick={() => BackToSetting()}> Back</Button>
            </div>
            <Button onClick={() => setNewOfficePopup(true)} type='primary' className='bg-blue-500 flex items-center gap-x-1 float-right mb-3'> <span>Add New Office</span> <FontAwesomeIcon icon={faPlus} className='icon' /> </Button>
            <Table
                style={{ marginTop: 10 }}
                bordered
                columns={columns}
                dataSource={TbOfficeData}
                // pagination={{
                //     pageSize: 6
                // }}
                 />

            <Modal
                title="Add New Office"
                open={newOfficePopup}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={[
                    popupBtnChange === false ? <Button key="1" onClick={createNewOffice}>Add</Button> : <Button key="1" onClick={EditOffice}>Save</Button>,
                    <Button type='text' key="2" danger="red" style={{ border: "0.5px solid red" }} onClick={handleCancel}>Close</Button>
                ]}>

                <Form>
                    {/* officename */}
                    <Form.Item label="Office Name" style={{ marginBottom: 0, marginTop: 10 }}>
                        <Input style={{ float: "right", width: "380px" }} placeholder='office name' name='officename' value={officeField.officename} onChange={officeInputData} />
                    </Form.Item>

                    {/* Address */}
                    <Form.Item label="Address" style={{ marginBottom: 0, marginTop: 10 }}>
                        <Input style={{ float: "right", width: "380px" }} placeholder='address' name='address' value={officeField.address} onChange={officeInputData} />
                    </Form.Item>

                    {/* City */}
                    <Form.Item label="City" style={{ marginBottom: 0, marginTop: 10 }}>
                        <Input style={{ float: "right", width: "380px" }} placeholder='city' name='city' value={officeField.city} onChange={officeInputData} />
                    </Form.Item>

                    {/* State */}
                    <Form.Item label="State" style={{ marginBottom: 0, marginTop: 10 }}>
                        <Input style={{ float: "right", width: "380px" }} placeholder='state' name='state' value={officeField.state} onChange={officeInputData} />
                    </Form.Item>

                    {/* Country */}
                    <Form.Item label="Country" style={{ marginBottom: 10, marginTop: 10 }}>
                        <Input style={{ float: "right", width: "380px" }} placeholder='country' name='country' value={officeField.country} onChange={officeInputData} />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}
export default OfficeSettings