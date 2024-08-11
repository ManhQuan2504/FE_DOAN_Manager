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
import moment from 'moment';

const OrderListPage = () => {
  document.title = "Đặt hàng";
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
      title: t('orderDate'),
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text) => moment(text).format('DD-MM-YYYY HH:mm'),
    },
    {
      title: t('customer'),
      key: 'customer',
      render: (text, record) => record.customer?.customerName,
    },
    {
      title: t('totalAmount'),
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: t('paymentMethod'),
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (text) => {
        if (text === 'cod') {
          return t('Thanh toán khi nhận hàng');
        } else if (text === 'paypal') {
          return t('Thanh toán Paypal');
        } else {
          return text; // Nếu có thêm phương thức thanh toán khác, nó sẽ được hiển thị nguyên văn
        }
      }
    },    
    {
      title: t('orderState'),
      dataIndex: 'orderState',
      key: 'orderState',
    },
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('order')}</div>
        <div className="button-list">
          <SearchOnList setSearchResults={setSearchResults} modelName={'orders'} />
          <AddButton to={`${PATH.MANAGER.ORDERS}/0`} />
          <ExportButton />
        </div>
      </div>
      <TableComponent data={searchResults.length > 0 ? searchResults : orders} columnsConfig={columnsConfig} loading={loading} />
    </div>
  );
};

export default OrderListPage;
