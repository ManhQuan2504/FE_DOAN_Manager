import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { t } from 'i18next';

const DropdownAvt = () => {

  const handleMenuClick = (e) => {
    console.log('click', e);
  };

  const items = [
    {
      label: t('account'),
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: t('2nd menu item'),
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: t('3rd menu item'),
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: t('4th menu item'),
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick} items={items} />
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow>
      <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
    </Dropdown>
  );
};

export default DropdownAvt;
