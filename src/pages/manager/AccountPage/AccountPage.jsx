import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Input, Avatar, Button, Upload, Spin, message, Typography } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { apiGetById, apiUpdate, apiUpload } from '~/services/helperServices';

const { Title } = Typography;

function AccountPage() {
  document.title = "Thông tin cá nhân";
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [file, setFile] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const { _id } = JSON.parse(localStorage.getItem('user'));
      const employeeData = await apiGetById({ modelName: 'employees', id: _id });
      console.log("🚀 ~ fetchData ~ employeeData:", employeeData)
      setUserData(employeeData.dataObject);  // Cập nhật state userData
      form.setFieldsValue({
        avatar: employeeData.dataObject.avatar[0],
        employeeCode: employeeData.dataObject.employeeCode,
        employeeName: employeeData.dataObject.employeeName,
        email: employeeData.dataObject.email,
        phoneNumber: employeeData.dataObject.phoneNumber,
        identityNumber: employeeData.dataObject.identityNumber,
        address: employeeData.dataObject.address,
        role: employeeData.dataObject.role.roleName,
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Gọi API ngay khi trang được load
  }, []); // Chỉ gọi một lần khi component được mount

  const handleFinish = async (values) => {
    const data = {
      modelName: 'employees',
      data: {
        ...values,
      },
    };
    console.log("🚀 ~ handleFinish ~ data:", data)
    // await apiUpdate(data);
    // message.success(t('messages.createSuccess'));
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleAvatarChange = async ({ file }) => {
    const updatedFile = [];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setFile(file.preview);
    updatedFile.push(file);

    try {
      const uploadedImage = await apiUpload(updatedFile);
      console.log("🚀 ~ handleAvatarChange ~ uploadedImage:", uploadedImage);
      form.setFieldsValue({
        avatar: uploadedImage[0],
      })
      console.log("🚀 ~ handleAvatarChange ~ form:", form.getFieldValue())
    } catch (error) {
      message.error(t('Failed to upload avatar.'));
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={14} xl={10}>
          <Card
            bordered={false}
            style={{ textAlign: 'left', borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            <Row justify="center" style={{ marginBottom: 24 }}>
              <Col style={{ textAlign: 'center' }}>
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  src={file}
                  style={{ border: '2px solid #e8e8e8', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                />
                <div style={{ marginTop: '12px' }}>
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    onChange={handleAvatarChange}
                  >
                    <Button icon={<UploadOutlined />}>
                      {t('changeAvatar')}
                    </Button>
                  </Upload>
                </div>
              </Col>
            </Row>

            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Title level={4} style={{ textAlign: 'center' }}>{t('accountInformation')}</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="employeeCode" label={t('employeeCode')}>
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="employeeName" label={t('employeeName')}>
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>
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
                <Input readOnly />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
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
