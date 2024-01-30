import React, { useEffect, useState } from 'react';
import { Form,Modal,Space, Table, Tag, Button, Col, Row, Statistic, Divider, Input,  Checkbox, Select } from 'antd';

import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../redux/slices/employeeSlice';
import { getroledetails } from '../redux/slices/roleDetailSlice';
import '../css/user.css';
import { CountriesAPI } from '../apilinks/countrycode'

const formatter = (value) => <CountUp end={value} />;


const { Option } = Select;



const Users = ({ officeData }) => {


  const [searchText, setSearchText] = useState('');
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
      render: (text) => <a>{text}</a>,
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLowerCase().includes(value.toLowerCase()) ||
          // String(record.lastname)
          // .toLowerCase().includes(value.toLowerCase()) ||
          String(record.age)
            .toLowerCase().includes(value.toLowerCase()) ||
          String(record.sno)
            .toLowerCase().includes(value.toLowerCase()) ||
          String(record.position)
            .toLowerCase().includes(value.toLowerCase())
        );
      }
    },
    // {
    //   title: 'Last Name',
    //   dataIndex: 'lastname',
    //   key: 'id',
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'id',
    },
    {
      title: 'Position',
      key: 'position',
      dataIndex: 'position',
      render: (_, { position }) => (
        <>
          {position.map((tag) => {
            let color = tag.length > 7 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            } else if (tag === 'Not Assigned') {
              color = 'red';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'MobileNumber',
      dataIndex: 'mobilenumber',
      key: 'id',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { employee, loading } = useSelector(state => state.employee);
  const { roledetails, roledetailloading } = useSelector(state => state.roledetails)

  const [empData, setEmpData] = useState([]);
  const [roledetailData, setRoledetailData] = useState([]);
  const [empCounts, setEmpCounts] = useState();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getroledetails());
  }, []);

  useEffect(() => {
    setRoledetailData(roledetails);
    setEmpData(employee);
    DataLoading();
  }, [employee, officeData, roledetails]);



  function DataLoading() {
    var numberOfOffice = officeData.filter((off) => off.officename);
    var officeNames = numberOfOffice.map((off) => {
      return off.officename;
    });
    if (officeNames.length === 1) {
      var filterOneOffice = empData.filter((off) => off.officeLocationId.officename === officeNames[0]);
      setEmpCounts(filterOneOffice.length);
      setTableData(filterOneOffice);
    } else {
      setEmpCounts(empData.length);
      setTableData(empData);
    }
  }


  function calculateAge(birthdate) {
    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  function roleCheck(roleid) {
    var roleDataCheck = roledetailData.filter(role => role.id === roleid);

    if (roleDataCheck.length > 0) {
      return roleDataCheck[0].rollName;
    } else {
      return "Not Assigned";
    }
  }



  const Tbdata = tableData && tableData.length > 0
    ? tableData.map((el, i) => ({
      sno: i + 1,
      key: el.id || '',
      name: `${el.firstName + " " + el.lastName}` || '',
      lastname: el.lastName || '',
      age: calculateAge(el.dateOfBirth),
      position: [el.departmentId.departmentName, roleCheck(el.roleDetails.length < 1 ? "Not Assigned" : el.roleDetails[0].roleId)],
      mobilenumber: el.mobileNumber || '',
    }))
    : [];


  //pop-up details
  const [popupData, setPopupData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function showModal() {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [componentDisabled, setComponentDisabled] = useState(true);

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [officeEmail, setOfficeEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState();
  const [countryCodeFiled, setCountryCodeFiled] = useState(false);
  const [alternateContactNo, setAlternativeContactNo] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [dateOfBirth, setDataOfBirth] = useState('');
  const [dateOfJoin, setDateOfJoin] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue={countryCode} >
      <span>{countryCode}</span>
    </Form.Item>
  );

  function onChange(value) {
    console.log(`selected ${value}`);
    var countryName = CountriesAPI.filter(x => x.name === value);
    setCountryCode(countryName[0].code);
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  function SubmitBtn() {
    console.log(mobileNumber.length);
    if (mobileNumber.length < 11) {

    }
  }
  return (
    <div >
      <Row gutter={[16, 16]} align='middle'>
        <Col span={3}><Statistic title="User Count" value={empCounts} formatter={formatter} /></Col>
        <Col span={17} style={{ left: '0%' }}> <Input.Search placeholder='Search here....'
          onSearch={(value) => { setSearchText(value) }}
          onChange={(e) => { setSearchText(e.target.value) }} style={{ width: `30%` }} /></Col>
        <Col span={4}  ><Button type="primary" className='bg-blue-500'>Add User</Button></Col>
      </Row>

      <Divider />
      {/* <Row> */}

      <Col span={25}>


        <Table columns={columns}
          dataSource={Tbdata}
          pagination={{ pageSize: 5 }}
          //rowSelection={rowSelection}
          onRow={(record, rowindex) => {
            return {
              onClick: event => {
                // console.log(record);

                // setEmpDetailPopup(true);
                var fullDetail = empData.filter(em => em.id === record.key);
                // console.log(fullDetail[0].personalEmail === null || "PersonalEmail" || "String" ? "Not mention" : fullDetail[0].personalEmail);
                setPopupData(fullDetail);
                showModal();
                setFirstName(fullDetail[0].firstName);
                setLastName(fullDetail[0].lastName);
                setGender(fullDetail[0].gender === null || "String" ? "Not mention" : fullDetail[0].gender);
                setPersonalEmail(fullDetail[0].personalEmail === null || "PersonalEmail" || "String" ? "Not mention" : fullDetail[0].personalEmail);
                setOfficeEmail(fullDetail[0].officeEmail === "OfficeEmail" || null || "String" ? "Not mention" : fullDetail[0].officeEmail);
                setMobileNumber(fullDetail[0].mobilenumber === "MobileNumber" || null ? "Not mention" : fullDetail[0].mobileNumber);
                
               
                
               var fullNumber = fullDetail[0].mobilenumber === "MobileNumber" || null ? "Not mention" : fullDetail[0].mobileNumber
              
              //  var codes = ful
              }
            }
          }}
        />

      </Col>

      {/* <Col span={1} align='center'><Divider type='vertical'style={{ height: '100%' }}/></Col> */}


      {/* <Col span={25}> */}

      {/* </Col> */}


      {/* </Row> */}




      <Modal 
      //bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }} 
      popupData={popupData} footer={[]} title="Details" open={isModalOpen} width={1000}  onOk={handleOk} onCancel={handleCancel}>

        {popupData.map(el => {
          return (
            <section key={el.id} className=''>

              <div className='flex gap-x-2'>
                <h2 className='font-bold'>Personal Details</h2>
                <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)}></Checkbox>
              </div>

              <Form disabled={componentDisabled} style={{ maxWidth: 300, }}>
                <h2 className='mt-2'><label >Employee ID :</label> <span>{el.id}</span> </h2>
                {/* name */}
                <Form.Item label="Name" style={{ marginBottom: 0, marginTop: 10 }}>
                  <Row>
                    <Col><Input className='text-gray-600' onChange={(e) => setFirstName(e.target.value)} value={firstName} /> </Col>
                    <Col><Input className='text-gray-600 inline-block' onChange={(e) => setFirstName(e.target.value)} value={lastName} /></Col>
                  </Row>
                </Form.Item>


                {/* Gender */}
                <Form.Item label="Gender" style={{ marginBottom: 0, marginTop: 10 }}><Input className='text-gray-600' onChange={(e) => setGender(e.target.value)} value={gender} /></Form.Item>


                {/* personal-email */}
                <Form.Item name="personal-email"
                  label="Presonal Email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      message: 'Please input your E-mail!',
                    },
                  ]}
                  initialValue={personalEmail}
                  style={{ marginBottom: 0, marginTop: 10 }}>
                  <Input className='text-gray-600' onChange={(e) => setPersonalEmail(e.target.value)} value={personalEmail} />
                </Form.Item>


                {/* office-email */}
                <Form.Item name="office-email"
                  label="Office Email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {

                      message: 'Please input your E-mail!',
                    },
                  ]}
                  initialValue={officeEmail}
                  style={{ marginBottom: 0, marginTop: 10 }}>
                  <Input className='text-gray-600' onChange={(e) => setOfficeEmail(e.target.value)} value={officeEmail} />
                </Form.Item>


                {/* countrycode */}
                {
                  componentDisabled === false ? <Form.Item label="Country" style={{ marginBottom: 0, marginTop: 10 }}>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select a country"
                      optionFilterProp="children"
                      onChange={onChange}
                      // onFocus={onFocus}
                      // onBlur={onBlur}
                      
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {
                        CountriesAPI.map((el, i) => {
                          return (
                            <Option key={i} value={el.name}>{el.name}</Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item> : ""
                }

                {/* mobile-number */}
                <Form.Item
                  name="mobile-number"
                  label="Mobile NO"
                  rules={[
                    {

                      message: 'Please input your phone number!',
                    },
                  ]}
                  initialValue={mobileNumber === "MobileNumber" ? "Not Mention" : mobileNumber}
                  style={{ marginBottom: 0, marginTop: 10 }}>
                  <Input addonBefore={prefixSelector}  onChange={(e) => { setMobileNumber(e.target.value) }} className='text-gray-600' />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" onClick={() => SubmitBtn()}>Register </Button>
                </Form.Item>

              </Form>


              {/* grid-1 */}
              <div>
                <h2 className='font-bold '>Personal Details</h2>
                <label>Employee ID :</label> <span>{el.id}</span> <br />
                <label>Name :</label> <span>{el.firstName + " " + el.lastName}</span> <br />
                <label>Gender :</label> {el.gender === null || "String" ? <span className='text-red-500'>Not Mention</span> : <span>{el.gender}</span>} <br />
                <label>Personal Email :</label> {el.personalEmail === "PersonalEmail" || null || "String" ? <span className='text-red-500'>Not Mention</span> : <span>{el.personalEmail}</span>} <br />
                <label>Office Email :</label> {el.officeEmail === "OfficeEmail" || null || "String" ? <span className='text-red-500'>Not Mention</span> : <span>{el.officeEmail}</span>} <br />
                <label>Mobile Number :</label> {el.mobileNumber === "MobileNumber" || null || "String" ? <span className='text-red-500'>Not Mention</span> : <span>{el.mobileNumber}</span>} <br />
                <label>AlternateContact Number :</label> {el.alternateContactNo === "Alternate" || null || "String" ? <span className='text-red-500'>Not Mention</span> : <span>{el.alternateContactNo}</span>} <br />
                <label>Contact Person Name :</label> <span>{el.contactPersonName}</span> <br />
                <label>Relationship :</label> <span>{el.relationship}</span> <br />
                <label>Date of Birth :</label> {el.dateOfBirth === "String" || null ? <span className='text-red-500'>Not Mention</span> : <span>{el.dateOfBirth} <br /> <label> Age :</label> <span>{calculateAge(el.dateOfBirth)}</span></span>} <br />
                <label>Date of Join :</label> <span>{el.dateOfJoin}</span> <br />
                <label>Blood Group :</label> <span>{el.bloodGroup}</span> <br />
                <label>Marital Status :</label> <span>{el.maritalStatus}</span> <br />
              </div>

              {/* grid-2 */}
              <div>
                <h2 className='font-bold ' >Office</h2>
                <label>Office Name :</label><span>{el.officeLocationId.officename}</span> <br />
                {/* <label className='underline'>Address</label> <br/> */}
                <span>{el.officeLocationId.address}</span> <br />
                <span>{el.officeLocationId.city}</span> <br />
                <span>{el.officeLocationId.state}</span> <br />
                <span>{el.officeLocationId.country}</span> <br />
              </div>

              {/* grid-3 */}
              <div>
                <h2 className='font-bold ' >Account</h2>
                <label>Bank Name :</label> {el.accountDetails.length > 0 ? <span>{el.accountDetails[0].bankName}</span> : <span className='text-red-500'>Not Mention</span>} <br />
                <label>Account No :</label> {el.accountDetails.length > 0 ? <span>{el.accountDetails[0].accountNumber}</span> : <span className='text-red-500'>Not Mention</span>} <br />
                <label>IFSC :</label> {el.accountDetails.length > 0 ? <span>{el.accountDetails[0].ifsc}</span> : <span className='text-red-500'>Not Mention</span>} <br />
                <label>Branch Name :</label> {el.accountDetails.length > 0 ? <span>{el.accountDetails[0].branchName}</span> : <span className='text-red-500'>Not Mention</span>} <br />
                <label>Bank Location :</label> {el.accountDetails.length > 0 ? <span>{el.accountDetails[0].bankLocation}</span> : <span className='text-red-500'>Not Mention</span>} <br />
              </div>
            </section>
          )
        })}
      </Modal>

    </div>

  );
};

export default Users;