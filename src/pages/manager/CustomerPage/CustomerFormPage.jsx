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

const { Option } = Select;
const { TextArea } = Input;

const ProductFormPage = () => {
  document.title = "Khách hàng";
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();


  const formChange = async (changedValues, allValues) => {
    console.log("🚀 ~ form.getFieldsValue():", form.getFieldsValue());
    // console.log("🚀 ~ allValues:", allValues);
  };


  const fetchData = async () => {
    setLoading(true);
    try {
      if (id && id !== '0') {
        const customerData = await apiGetById({ modelName: 'customers', id });
        console.log("🚀 ~ fetchData ~ customerData:", customerData)
        form.setFieldsValue(customerData.dataObject);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // return () => {
    //   form.resetFields();
    // };
  }, [id, form]);

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('customer')}</div>
        <div className="button-list">
          <BackButton />
          <UpdateButton form={form} navigate={navigate} id={id} modelName="customers" />
          <DeleteButton id={id} modelName="customers" />
        </div>
      </div>
      <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('customerName')} name="customerName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('email')} name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('phoneNumber')} name="phoneNumber">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12]}>
          <Col span={12}>
            <Form.Item label={t('address')} name="address">
              <Input />
            </Form.Item>
          </Col>
        </Row>


      </Form>
    </div>
  );
};

export default ProductFormPage;
