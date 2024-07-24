import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { PATH } from '~/constants/part';
import './ProductFormPage.css'; // Import file CSS tùy chỉnh
import TableComponent from '~/components/TableComponent';
import { useTranslation } from 'react-i18next';
import { apiGetList } from '~/services/helperServices';

const ProductFormPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  console.log("🚀 ~ ProductFormPage ~ products:", products)

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'products',
        data: {},
      };
      const response = await apiGetList(data);
      setProducts(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch Functions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columnsConfig = [
    {
      title: t('productCode'),
      dataIndex: 'productCode',
      key: 'productCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.PRODUCTS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('productName'),
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: t('category'),
      key: 'categoryName',
      render: (text, record) => record.category?.categoryName,
    },
    {
      title: t('price'),
      dataIndex: 'price',
      key: 'price',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('product')}</div>
        <div className="button-list">
          <AddButton to={`${PATH.MANAGER.PRODUCTS}/0`} />
          <ExportButton />
        </div>
      </div>
      <TableComponent data={products} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default ProductFormPage;