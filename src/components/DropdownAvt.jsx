import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/part';

const DropdownAvt = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout(); // Gọi hàm logout khi nhấn vào mục "Logout"
    } else {
      console.log('click', key);
    }
  };

  const handleLogout = () => {
    const keysToRemove = ['user', 'functions'];
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });

    navigate(`${PATH.MANAGER.LOGIN}`);
  };

  const items = [
    {
      label: t('account'),
      key: '1',
      icon: <UserOutlined />,
      url: PATH.MANAGER.ACCOUNT,
    },
    {
      label: t('logout'),
      key: 'logout', // Đặt key là 'logout' để nhận biết khi người dùng nhấn vào "Logout"
      icon: <UserOutlined />,
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.url ? (
            <NavLink to={item.url}>{item.label}</NavLink>
          ) : (
            <span>{item.label}</span>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow>
      <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
    </Dropdown>
  );
};

export default DropdownAvt;
