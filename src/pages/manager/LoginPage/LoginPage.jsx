import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';  // Import CSS của Ant Design
import { employeeLogin, getFunc, getPer } from '~/services/manager/UI';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/redux/manager/slices/authSlice';
import { fetchFunction } from '~/redux/manager/slices/functionSlice';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/part';

const LoginPage = () => {
  document.title = "Đăng nhập";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  useEffect(() => {
    if (state.auth?.isAuthenticated) {
      console.log("🚀 ~ LoginPage ~ state after login:", state);
    }
  }, [state.auth?.isAuthenticated]);

  const onFinish = async (values) => {
    const loginData = {
      modelName: 'employees',
      data: values
    };
    try {
      const result = await employeeLogin(loginData);
      console.log("🚀 ~ onFinish ~ result:", result)
      if(result) {
        localStorage.setItem('user', JSON.stringify(result?.dataObject));
        const { functionList, permissionList } = result?.dataObject?.role;
        const resultFunc = await getFunc(functionList);
        localStorage.setItem('functions', JSON.stringify(resultFunc));
        const resultPer = await getPer(permissionList);
        localStorage.setItem('permissions', JSON.stringify(resultPer));

      }      
      // dispatch(login(result));
      // dispatch(fetchFunction());
      navigate(`${PATH.MANAGER.DASHBOARD}`);
    } catch (error) {
      console.log('Login Failed:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <div style={{ maxWidth: 400, width: '100%', height: 350, padding: '2rem', background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Đăng nhập</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="employeeCode"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            style={{ marginBottom: '20px' }}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
