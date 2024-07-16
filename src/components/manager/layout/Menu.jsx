import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay cho Navigate
import { PATH } from '~/constants/part';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import { useDispatch, useSelector } from "react-redux";
import * as Style from "./styles";

const { SubMenu } = Menu;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const navigate = useNavigate(); // Sử dụng useNavigate hook

  const functionList = JSON.parse(localStorage?.functions || '[]');

  useEffect(() => {
    if (!localStorage?.functions) {
      navigate(PATH.MANAGER.LOGIN); // Sử dụng navigate thay cho Navigate
    }
  }, [navigate]); // Thêm navigate vào dependency array

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const transformDataToMenuItems = (data) => {
    if (data && data.length > 0) {
      const menuItems = data
        .filter(item => item.isParent)
        .map(parent => ({
          key: parent._id,
          label: t(parent.funcName),
          children: data
            .filter(child => child.parentFunc === parent._id)
            .map(child => ({
              key: child._id,
              label: t(child.funcName),
              url: child.clientPath,
            })),
        }));

      return menuItems;
    } else {
      return [];
    }
  };

  const menuItems = transformDataToMenuItems(functionList);
  const defaultOpenKeys = menuItems.map(item => item.key);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, width: '100%' }}>
        <Style.HeaderLogo onClick={() => navigate('/manager')}>
          LANCHISHOP
        </Style.HeaderLogo>
      </div>

      <Menu
        theme={theme}
        onClick={onClick}
        style={{ width: '100%' }}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={[current]}
        mode="inline"
      >
        {menuItems.map((item) => (
          <SubMenu key={item.key} title={item.label}>
            {item.children.map((child) => (
              <Menu.Item key={child.key}>
                <NavLink to={child.url}>{child.label}</NavLink>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </>
  );
};

export default App;
