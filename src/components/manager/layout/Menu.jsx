import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/part';
import { t } from 'i18next';
import * as Style from "./styles";

const { SubMenu } = Menu;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const navigate = useNavigate();

  const functionList = JSON.parse(localStorage?.functions || '[]');

  useEffect(() => {
    if (!localStorage?.functions) {
      navigate(PATH.MANAGER.LOGIN);
    }
  }, [navigate]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const transformDataToMenuItems = (data) => {
    if (data && data.length > 0) {
      const menuItems = data
        .filter(item => item.isParent)
        .map(parent => {
          const children = data.filter(child => child.parentFunc === parent._id).map(child => ({
            key: child._id,
            label: t(child.funcName),
            url: child.clientPath,
          }));

          // Sắp xếp các chức năng con theo tên đã dịch
          children.sort((a, b) => a.label.localeCompare(b.label, 'vi', { sensitivity: 'base' }));

          return children.length > 0
            ? {
                key: parent._id,
                label: t(parent.funcName),
                children: children,
              }
            : {
                key: parent._id,
                label: t(parent.funcName),
                url: parent.clientPath,
              };
        });

      // Sắp xếp các chức năng cha theo tên đã dịch
      menuItems.sort((a, b) => a.label.localeCompare(b.label, 'vi', { sensitivity: 'base' }));

      return menuItems;
    } else {
      return [];
    }
  };

  const menuItems = transformDataToMenuItems(functionList);
  const defaultOpenKeys = menuItems.filter(item => item.children).map(item => item.key);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, width: '100%' }}>
        <Style.HeaderLogo onClick={() => navigate('')}>
          LANCHISHOP
        </Style.HeaderLogo>
      </div>

      <Menu
        theme={theme}
        onClick={onClick}
        style={{ width: '100%', maxHeight: '700px', overflowY: 'auto', fontSize:'16px' }}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={[current]}
        mode="inline"
      >
        {menuItems.map((item) =>
          item.children ? (
            <SubMenu key={item.key} title={item.label}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>
                  <NavLink to={child.url}>{child.label}</NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.key}>
              <NavLink to={item.url}>{item.label}</NavLink>
            </Menu.Item>
          )
        )}
      </Menu>
    </>
  );
};

export default App;
