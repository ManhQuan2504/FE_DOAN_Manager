import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, DatePicker, Tabs, InputNumber, Button } from 'antd';
import CreateButton from '~/components/manager/listAction/CreateButton';
import { useTranslation } from 'react-i18next';
import { apiGetById } from '~/services/helperServices';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import ProductSearch from '~/components/ProductFieldComponent';
import { COLOR_MENU } from '~/constants/colorConstants';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const SalesFormPage = () => {
  const { t } = useTranslation();
  const [sale, setSale] = useState({});
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const formChange = async (changedValues, allValues) => {
    console.log("🚀 ~ form.getFieldsValue():", form.getFieldsValue());
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (id && id !== '0') {
        const saleData = await apiGetById({ modelName: 'sales', id });
        setSale(saleData.dataObject);
        form.setFieldsValue(saleData.dataObject);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, form]);

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('sale')}</div>
        <div className="button-list">
          <BackButton />
          <UpdateButton form={form} navigate={navigate} id={id} modelName="sales" />
          <DeleteButton id={id} modelName="sales" />
          <CreateButton form={form} navigate={navigate} modelName="sales" />
        </div>
      </div>
      <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('salesInfor')} key="1">
            <Row gutter={[12]}>
              <Col span={6}>
                <Form.Item label={t('saleNumber')} name="saleNumber">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('employee')} name="employee">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('customer')} name="customer">
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
                <Form.Item label={t('shipTo')} name="shipTo">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('saleDate')} name="saleDate">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        <Tabs defaultActiveKey="1">
          <TabPane tab={t('salesProduct')} key="1">
            <Row gutter={[12]}>
              <Col span={6}>
                <Form.Item label={t('product')} name="product">
                  <ProductSearch />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('color')} name="color">
                  <Select>
                    {COLOR_MENU.map(color => (
                      <Option key={color.name} value={color.name}>
                        {color.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t('qty')} name="qty">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Button>{t('add')}</Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        <Tabs defaultActiveKey="1">
          <TabPane tab={t('salesDetail')} key="1">
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
};

export default SalesFormPage;
