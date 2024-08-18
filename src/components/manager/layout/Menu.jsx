import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay cho Navigate
import { PATH } from '~/constants/part';
import { t } from 'i18next';
import * as Style from "./styles";

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
      const menuItems = data.map(item => ({
        key: item._id,
        label: t(item.funcName),
        url: item.clientPath,
      }));
  
      // Sắp xếp theo tên đã dịch
      menuItems.sort((a, b) => a.label.localeCompare(b.label, 'vi', { sensitivity: 'base' }));
  
      return menuItems;
    } else {
      return [];
    }
  };
  

  const menuItems = transformDataToMenuItems(functionList);

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
        style={{ width: '100%', maxHeight: '700px', overflowY: 'auto', fontSize: '15px' }} // Thêm thuộc tính để tạo thanh cuộn
        selectedKeys={[current]}
        mode="inline"
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key}>
            <NavLink to={item.url}>{item.label}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

export default App;
