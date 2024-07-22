import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { apiGetList } from '~/services/helperServices'; // Đảm bảo đường dẫn chính xác
import { PATH } from '~/constants/part';
import _ from 'lodash';
import TableComponent from '~/components/TableComponent';
import { useTranslation } from 'react-i18next';

// Helper function to get unique values and sort them
const getUniqueValues = (categories, key) => {
  const values = categories.map(category => category[key]).filter(Boolean);
  return _.uniq(values).sort((a, b) => a.localeCompare(b));
};

const StockImportListPage = () => {
  const { t } = useTranslation();
  const [stockImports, setStockImports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStockImports = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'stockImports',
        data: {},
      };
      const response = await apiGetList(data);
      setStockImports(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch Functions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockImports();
  }, []);

  const columnsConfig = [
    {
      title: t('stockImportCode'),
      dataIndex: 'stockImportCode',
      key: 'stockImportCode',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.STOCKIMPORTS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('product'),
      key: 'productName',
      render: (text, record) => record?.product?.productName,
    },
    {
      title: t('qty'),
      dataIndex: 'qty',
      key: 'qty',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('stockImport')}</div>
        <div className="button-list">
          <AddButton to={`${PATH.MANAGER.STOCKIMPORTS}/0`} />
          <ExportButton />
        </div>
      </div>
      <TableComponent data={stockImports} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default StockImportListPage;
