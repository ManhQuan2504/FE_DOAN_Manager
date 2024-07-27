import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { PATH } from '~/constants/part';
import TableComponent from '~/components/TableComponent';
import { useTranslation } from 'react-i18next';
import { apiGetList } from '~/services/helperServices';

const SalesListPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'sales',
        data: {},
      };
      const response = await apiGetList(data);
      console.log("🚀 ~ fetchSales ~ response:", response)
      setSales(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch Functions:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSales();
  }, []);

  const columnsConfig = [
    {
      title: t('saleNumber'),
      dataIndex: 'saleNumber',
      key: 'saleNumber',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.SALES}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('saleDate'),
      dataIndex: 'saleDate',
      key: 'saleDate',
    },
    {
      title: t('customer'),
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: t('employee'),
      key: 'employeeName',
      render: (text, record) => record.employee?.employeeName,
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('sale')}</div>
        <div className="button-list">
          <AddButton to={`${PATH.MANAGER.SALES}/0`} />
          <ExportButton />
        </div>
      </div>
      <TableComponent data={sales} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default SalesListPage;
