import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import './manager-layout.css';
import { useTranslation } from 'react-i18next';
import { Space, Switch } from 'antd';
import i18n from '~/i18n/i18n';
import DropdownAvt from '../../DropdownAvt';
import { NavLink } from 'react-router-dom';
import { PATH } from '~/constants/part';

const { Header, Sider, Content } = Layout;

function ManagerLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onSwitchChange = (checked) => {
    if (checked) {
      changeLanguage('vi'); // Chuyển sang tiếng Việt nếu checked
    } else {
      changeLanguage('en'); // Chuyển sang tiếng Anh nếu không checked
    }
  };

  const menuItems = [
    {
      key: '0',
      label: 'Admin',
      url: PATH.MANAGER.DASHBOARD,
    },
    {
      key: '1',
      icon: <UserOutlined />,
      label: t('productManager'),
      url: PATH.MANAGER.PRODUCT,
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: t('userManager'),
      url: PATH.MANAGER.DASHBOARD,
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: t('employeeManager'),
      url: PATH.MANAGER.DASHBOARD,
    },
    {
      key: '4',
      icon: <UploadOutlined />,
      label: t('storeManager'),
      url: PATH.MANAGER.DASHBOARD,
    },
    {
      key: '5',
      icon: <UploadOutlined />,
      label: t('masterDataManager'),
      url: PATH.MANAGER.DASHBOARD,
    },
  ];

  return (
    <Layout style={{ height: '100%', minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={270}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline">
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} >
              <NavLink to={item.url}>
                {item.label}
              </NavLink>
            </Menu.Item>
          ))}
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
