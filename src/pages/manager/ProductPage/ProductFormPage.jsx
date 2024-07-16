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
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [product, setProduct] = useState();
  const [taxs, setTaxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  //nút tạo sp: gửi api upload ảnh => tạo sp
  const CreateProductButton = ({ modelName, form, navigate, ...props }) => {
    const { t } = useTranslation();

    const handleCreate = async () => {
      try {
        const formData = await form.getFieldValue();
        const uploadedImage = await apiUpload(formData.images)
        if (uploadedImage && uploadedImage?.length > 0) {
          delete formData.images;
          const data = {
            modelName: modelName,
            data: {
              ...formData,
              images: uploadedImage,
            },
          };
          console.log("🚀 ~ handleCreate ~ data:", data)
          await apiCreate(data);
          message.success(t('messages.createSuccess'));
          navigate(-1); // Navigate back to the previous page
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

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'categories',
        data: {},
      };
      const response = await apiGetList(data);
      setCategories(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch Category:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUoms = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'uoms',
        data: {},
      };
      const response = await apiGetList(data);
      setUoms(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch uoms:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTaxs = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'taxs',
        data: {},
      };
      const response = await apiGetList(data);
      setTaxs(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch taxs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (id && id !== '0') {
        const productData = await apiGetById({ modelName: 'products', id });
        setProduct(productData.dataObject);
        form.setFieldsValue(productData.dataObject); 
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchUoms();
    fetchTaxs();
    fetchData();

    // return () => {
    //   form.resetFields();
    // };
  }, [id, form]);

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('product')}</div>
        <div className="button-list">
          <BackButton />
          <UpdateButton form={form} navigate={navigate} id={id} modelName="products" />
          <DeleteButton id={id} modelName="products" />
          <CreateProductButton form={form} navigate={navigate} modelName="products" />
        </div>
      </div>
      <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('productCode')} name="productCode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('productName')} name="productName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('categoryId')} name="categoryId">
              <Select>
                {categories
                  .filter(category => !category.isParent)
                  .map(category => (
                    <Option key={category._id} value={category._id}>
                      {category.categoryName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('uomId')} name="uomId">
              <Select>
                {uoms.map(uom => (
                  <Option key={uom._id} value={uom._id}>
                    {uom.uomName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('price')} name="price">
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `${value}VNĐ`}
                parser={value => value.replace('VNĐ', '')}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('taxId')} name="taxId">
              <Select>
                {taxs.map(tax => (
                  <Option key={tax._id} value={tax._id}>
                    {tax.taxCode} - {tax.taxValue}%
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label={t('images')} name="images">
              <ImageUpload fileList={product?.images} limit={10}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12]}>
          <Col span={12}>
            <Form.Item label={t('description')} name="description">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('specifications')} name="specifications">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12]}>
          <Col span={6}>
            <Form.Item label={t('active')} name="active" valuePropName="checked">
              <Switch defaultChecked={true} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProductFormPage;
