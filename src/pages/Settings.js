import React, { useState } from 'react';
import { Button, Col, Divider, Layout, Switch, Row } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';
import { LeftCircleOutlined } from '@ant-design/icons'
import OfficeSettings from './settingsPages/OfficeSettings';
import RoleSettings from './settingsPages/RoleSettings';
import AccountDetailSettings from './settingsPages/AccountDetailsSettings';
import DepartmentSettings from './settingsPages/DepartmentSettings';
import AccessoriesSettings from './settingsPages/AccessoriesSettings';
import BrandSettings from './settingsPages/BrandSettings';





const Settings = () => {

  const [settingsBack, setsettingsBack] = useState(true);
  const [setingPreview, setPreview] = useState();


  const BackToSetting = ()=>{
    setsettingsBack(true)
  };

  const settingList = [
    {
      key: 1,
      settingname: "Office",
      componets: <OfficeSettings />,
      props: { BackToSetting : () => setsettingsBack(true) }
    },
    {
      key: 2,
      settingname: "Role",
      componets: <RoleSettings />,
      props: { BackToSetting : () => setsettingsBack(true) }
    },
    {
      key: 3,
      settingname: "Account Details",
      componets: <AccountDetailSettings />,
      props: { BackToSetting : () => setsettingsBack(true) }
    },
    {
      key: 4,
      settingname: "Department",
      componets: <DepartmentSettings />,
      props: { BackToSetting : () => setsettingsBack(true) }
    },
    {
      key: 4,
      settingname: "Accessories",
      componets: <AccessoriesSettings />,
      props: { BackToSetting : () => setsettingsBack(true) }
    },
    {
      key: 5,
      settingname: "Brand",
      componets: <BrandSettings />,
      props: { BackToSetting : () => setsettingsBack(true) }
    }
  ];

  const curdPage = (e) => {
    setsettingsBack(false);
    const selectedSetting = settingList.find((setting) => setting.settingname === e.target.innerText);
    if (selectedSetting && selectedSetting.componets) {
      setPreview(React.cloneElement(selectedSetting.componets, { ...selectedSetting.props, BackToSetting }));
    }
  };

  return (
    <div>
      {/* <h3>Theme <Switch checkedChildren="Dark" unCheckedChildren="Light" defaultChecked /></h3> */}
      {
        settingsBack === true ? 
        <Row align="middle">
        {
          settingList.map((settings, i) => {
            return (
                <Col key={i} onClick={curdPage} className='cursor-pointer w-full py-2 hover:text-gray-500'>{settings.settingname} <Divider style={{ marginTop: 0, marginBottom: 3 }} /></Col>
            )
          })
        }
      </Row> : setingPreview
      }
    </div>
  );
};

export default Settings;