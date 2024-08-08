import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import AddButton from '~/components/manager/listAction/AddButton';
import ExportButton from '~/components/manager/listAction/ExportButton';
import { PATH } from '~/constants/part';
import TableComponent from '~/components/TableComponent';
import { useTranslation } from 'react-i18next';
import { apiGetList } from '~/services/helperServices';
import SearchOnList from '~/components/manager/listAction/SearchOnListComponent';

const OrderListPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = {
        modelName: 'orders',
        data: {},
      };
      const response = await apiGetList(data);
      setOrders(response.dataObject);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const columnsConfig = [
    {
      title: t('orderNumber'),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text, record) => (
        <NavLink to={`${PATH.MANAGER.ORDERS}/${record._id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: t('customer'),
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: t('totalAmount'),
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: t('paided'),
      dataIndex: 'paided',
      key: 'paided',
    },
    {
      title: t('saleState'),
      dataIndex: 'saleState',
      key: 'saleState',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('order')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'orders'}/>
          <AddButton to={`${PATH.MANAGER.ORDERS}/0`} />
          <ExportButton />
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : orders} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default OrderListPage;
