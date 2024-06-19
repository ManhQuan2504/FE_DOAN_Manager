import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import Menu from './Menu';
import './manager-layout.css';
import { useTranslation } from 'react-i18next';
import { Space, Switch } from 'antd';
import i18n from '~/i18n/i18n';
import DropdownAvt from '../../DropdownAvt';
import { NavLink } from 'react-router-dom';
import { PATH } from '~/constants/part';
import { getFunc } from '~/services/manager/UI';

const { Header, Sider, Content } = Layout;

function ManagerLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [functions, setFunctions] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onSwitchChange = (checked) => { //anh việt
    if (checked) {
      changeLanguage('vi');
    } else {
      changeLanguage('en');
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getFunc();
  //     setFunctions(data);
  //   };

  //   fetchData();
  // }, []);

  

  return (
    <Layout style={{ height: '100%', minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={270} theme="light">
        <div className="demo-logo-vertical" />
        <Menu theme="light" mode="inline" width={'100%'}>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
            <Switch checkedChildren="VN" unCheckedChildren="ENG" defaultChecked onChange={onSwitchChange} style={{ marginRight: '20px' }} />
            <DropdownAvt />
          </div>
        </Header>
        <Content
          className="layout-content"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="content-body">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ManagerLayout;
