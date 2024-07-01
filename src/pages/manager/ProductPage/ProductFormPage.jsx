import React from 'react';
import { Form, Input, Row, Col, Select, InputNumber, DatePicker } from 'antd';
import CreateButton from '~/components/manager/listAction/CreateButton';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { TextArea } = Input;

const ProductFormPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('product')}</div>
        <div className="button-list">
          <CreateButton />
        </div>
      </div>
      <Form layout="vertical" style={{ maxWidth: '100%' }}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('productCode')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('productName')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('parentCategoryId')}>
              <Select >
                <Option value="category1">{t('product.category1')}</Option>
                <Option value="category2">{t('product.category2')}</Option>
                <Option value="category3">{t('product.category3')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('categoryId')}>
              <Select >
                <Option value="category1">{t('product.category1')}</Option>
                <Option value="category2">{t('product.category2')}</Option>
                <Option value="category3">{t('product.category3')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('product.price')}>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder={t('product.price_placeholder')}
                formatter={value => `$ ${value}`}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('product.quantity')}>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder={t('product.quantity_placeholder')}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('product.expiry_date')}>
              <DatePicker style={{ width: '100%' }} placeholder={t('product.expiry_date_placeholder')} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12]}>
          <Col span={12}>
            <Form.Item label={t('description')}>
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('specifications')}>
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProductFormPage;
