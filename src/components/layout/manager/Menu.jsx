import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { PATH } from '~/constants/part';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import { useDispatch, useSelector } from "react-redux";
import { fetchFunction } from '~/redux/manager/slices/functionSlice';

const { SubMenu } = Menu;

const App = () => {
  const dataObject = [
    {
      "_id": "666ebbb6a9da5c2373cc5555",
      "clientPath": "#",
      "funcName": "productManager",
      "isParent": true,
      "active": true,
      "deleted": false,
      "__v": 0
    },
    {
      "_id": "666ebbeca9da5c2373cc5557",
      "clientPath": "/manager/products",
      "funcName": "product",
      "parentFunc": "666ebbb6a9da5c2373cc5555",
      "isParent": false,
      "active": true,
      "deleted": false,
      "__v": 0
    },
    {
      "_id": "666ebbfea9da5c2373cc5559",
      "clientPath": "/manager/productstest",
      "funcName": "productTest",
      "parentFunc": "666ebbb6a9da5c2373cc5555",
      "isParent": false,
      "active": true,
      "deleted": false,
      "__v": 0
    },
    {
      "_id": "666f00f0cc0f37cc7055ee22",
      "clientPath": "#",
      "funcName": "system",
      "isParent": true,
      "active": true,
      "deleted": false,
      "__v": 0
    },
    {
      "_id": "666f012ecc0f37cc7055ee24",
      "clientPath": "/manager/functions",
      "funcName": "function",
      "parentFunc": "666f00f0cc0f37cc7055ee22",
      "isParent": false,
      "active": true,
      "deleted": false,
      "__v": 0
    }
  ]

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFunction());
  }, []);

  // Hàm chuyển đổi dữ liệu từ dataObject
  const transformDataToMenuItems = (data) => {
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
  };


  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const menuItems = transformDataToMenuItems(dataObject);

  const [defaultOpenKeys, setDefaultOpenKeys] = useState(menuItems.map(item => item.key));

  return (
    <>
      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={[
          {
            key: '0',
            label: 'Admin',
            url: PATH.MANAGER.DASHBOARD,
          },
        ]}
      />

      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: 256,
        }}
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
