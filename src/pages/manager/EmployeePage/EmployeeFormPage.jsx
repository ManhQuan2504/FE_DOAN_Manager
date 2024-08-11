import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, InputNumber, Switch, Upload, message, Button } from 'antd';
import CreateButton from '~/components/manager/listAction/CreateButton';
import { useTranslation } from 'react-i18next';
import { apiCreate, apiGetById, apiGetList, apiUpload } from '~/services/helperServices';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import ImageUpload from '~/components/uploadComponent';
import Password from 'antd/es/input/Password';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const ProductFormPage = () => {
  document.title = "Nhân viên";
  const { t } = useTranslation();
  const [employee, setEmployee] = useState([]);
  console.log("🚀 ~ ProductFormPage ~ employee:", employee)
  const [roles, setRoles] = useState([]);
  console.log("🚀 ~ ProductFormPage ~ roles:", roles)
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  //nút tạo sp: gửi api upload ảnh => tạo NV
  const CreateEmployeeButton = ({ modelName, form, navigate, ...props }) => {
    const { t } = useTranslation();

    const handleCreate = async () => {
      try {
        const formData = await form.getFieldValue();
        console.log("🚀 ~ handleCreate ~ formData:", formData)
        const uploadedImage = await apiUpload(formData.avatar)
        if (uploadedImage && uploadedImage?.length > 0) {
          delete formData.avatar;
          const data = {
            modelName: modelName,
            data: {
              ...formData,
              avatar: uploadedImage,
            },
          };
          console.log("🚀 ~ handleCreate ~ data:", data)
          await axios.post(`http://localhost/v1/employees/createEmployee`, data);
          message.success(t('messages.createSuccess'));
          navigate('/manager/employees'); // Navigate back to the previous page
        }

      } catch (error) {
        console.error('Failed to create item:', error);
        message.error(t('messages.createFail'));
      }
    };

    return (
      <Button
        type="primary"
        onClick={handleCreate}
        {...props}
      >
        {t('button.create')}
      </Button>
    );
  };

  const formChange = async (changedValues, allValues) => {
    console.log("🚀 ~ form.getFieldsValue():", form.getFieldsValue());
    // console.log("🚀 ~ allValues:", allValues);
  };

  const fetchRole = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'roles',
        data: {},
      };
      const response = await apiGetList(data);
      setRoles(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    } finally {
      setLoading(false);
    }
  };


  const fetchData = async () => {
    setLoading(true);
    try {
      if (id && id !== '0') {
        const employeeData = await apiGetById({ modelName: 'employees', id });
        setEmployee(employeeData.dataObject);
        form.setFieldsValue({
          ...employeeData.dataObject,
          role: employeeData.dataObject.role._id
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchData();

    // return () => {
    //   form.resetFields();
    // };
  }, [id, form]);
  console.log("🚀 ~ ProductFormPage ~ employee:", employee)

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('employee')}</div>
        <div className="button-list">
          <BackButton />
          <UpdateButton form={form} navigate={navigate} id={id} modelName="employees" />
          <DeleteButton id={id} modelName="employees" />
          <CreateEmployeeButton form={form} navigate={navigate} modelName="employees" />
        </div>
      </div>
      <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('employeeCode')} name="employeeCode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('employeeName')} name="employeeName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('email')} name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('password')} name="password" >
              <Password />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('phoneNumber')} name="phoneNumber">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('identityNumber')} name="identityNumber">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('role')} name="role">
              <Select>
                {roles.map(role => (
                  <Option key={role._id} value={role._id}>
                    {role.roleName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label={t('address')} name="address">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label={t('avatar')} name="avatar">
              <ImageUpload fileList={employee.avatar} limit={1}/>
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default ProductFormPage;
