import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Input, Avatar, Button, Upload, Spin, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function AccountPage() {
  document.title = "Thông tin cá nhân";
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch user data from an API or local storage
    axios.get('/api/user/profile')
      .then(response => {
        setUserData(response.data);
        setLoading(false);
        form.setFieldsValue(response.data); // Set form values with fetched data
      })
      .catch(error => {
        console.error('Failed to fetch user data:', error);
        setLoading(false);
      });
  }, [form]);

  const handleFinish = (values) => {
    // Handle form submission to update user data
    setLoading(true);
    axios.post('/api/user/updateProfile', values)
      .then(() => {
        message.success(t('Profile updated successfully!'));
      })
      .catch(error => {
        message.error(t('Failed to update profile.'));
        console.error('Failed to update profile:', error);
      })
      .finally(() => setLoading(false));
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // Get the uploaded avatar URL
      const avatarUrl = info.file.response.url;
      form.setFieldsValue({ avatar: avatarUrl });
      setUserData((prevData) => ({ ...prevData, avatar: avatarUrl }));
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="left">
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Card
            title={t('accountInformation')}
            bordered={false}
            style={{ textAlign: 'left' }}
          >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Form.Item name="avatar" label={t('')}>
                <Avatar size={100} icon={<UserOutlined />} src={userData?.avatar} />
                <div style={{ marginTop: '8px' }}> {/* Add margin to separate the button from the avatar */}
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    action="/api/upload/avatar" // Replace with your actual upload endpoint
                    onChange={handleAvatarChange}
                  >
                    <Button icon={<UploadOutlined />}>
                      {t('changeAvatar')}
                    </Button>
                  </Upload>
                </div>
              </Form.Item>
              <Form.Item name="employeeCode" label={t('employeeCode')}>
                <Input disabled />
              </Form.Item>
              <Form.Item name="employeeName" label={t('employeeName')}>
                <Input disabled />
              </Form.Item>
              <Form.Item name="email" label={t('email')}>
                <Input />
              </Form.Item>
              <Form.Item name="phoneNumber" label={t('phoneNumber')}>
                <Input />
              </Form.Item>
              <Form.Item name="identityNumber" label={t('identityNumber')}>
                <Input />
              </Form.Item>
              <Form.Item name="address" label={t('address')}>
                <Input />
              </Form.Item>
              <Form.Item name="role" label={t('Chức vụ')}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('saveChanges')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AccountPage;
