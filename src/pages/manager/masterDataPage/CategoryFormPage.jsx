import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Select, Switch } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CreateButton from '~/components/manager/listAction/CreateButton';
import BackButton from '~/components/manager/listAction/BackButton';
import UpdateButton from '~/components/manager/listAction/UpdateButton';
import DeleteButton from '~/components/manager/listAction/DeleteButton';
import { useTranslation } from 'react-i18next';
import { apiGetById, apiGetList } from '~/services/helperServices';

const { Option } = Select;
const { TextArea } = Input;

const CategoryFormPage = () => {
  const { t } = useTranslation();
  const { id } = useParams(); // get id from URL parameters
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = {
          modelName: 'categories',
          data: {},
        };
        const response = await apiGetList(data);
        setCategories(response.dataObject);

        if (id && id !== '0') {
          const categoryData = await apiGetById({ modelName: 'categories', id });
          form.setFieldsValue(categoryData.dataObject); // Sử dụng form.setFieldsValue khi form đã được khởi tạo
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]); // Sử dụng form là dependency của useEffect

  const categoryParentChange = value => {
    const selectedCategory = categories.find(category => category._id === value);
    
    form.setFieldsValue({
      parentCategoryId: selectedCategory._id,
      parentCategoryCode: selectedCategory.categoryCode,
      parentCategoryName: selectedCategory.categoryName,
    });

    const formData = form.getFieldValue();
    console.log('Form Data:', formData);
  };

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('category')}</div>
        <div className="button-list">
          <BackButton />
          <UpdateButton form={form} navigate={navigate} id={id} modelName="categories" />
          <DeleteButton id={id} modelName="categories" />
          <CreateButton form={form} navigate={navigate} modelName="categories" />
        </div>
      </div>
      <Form layout="vertical" style={{ maxWidth: '100%' }} form={form}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('categoryCode')} name="categoryCode" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('categoryName')} name="categoryName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('parentCategoryId')} name="parentCategoryId">
              <Select
                onChange={categoryParentChange}
              >
                {categories
                  .filter(category => category.isParent) 
                  .map(category => (
                    <Option key={category._id} value={category._id}>
                      {category.categoryName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Form.Item label={t('active')} name="active">
              <Switch defaultChecked={true} />
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default CategoryFormPage;
