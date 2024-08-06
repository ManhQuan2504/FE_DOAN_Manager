import React, { useState } from 'react';
import { DatePicker, Button, Table, Row, Col, Form } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { useTranslation } from 'react-i18next';
import ExportButton from '~/components/manager/listAction/ExportButton';
import BackButton from '~/components/manager/listAction/BackButton';
import axios from 'axios';

const { RangePicker } = DatePicker;

const ReportSale = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState([]);
  const [dataReportByProduct, setDataReportByProduct] = useState([]);
  const [dataReportByDate, setDataReportByDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [form] = Form.useForm();

  const formChange = async (changedValues, allValues) => {
    console.log("🚀 ~ form.getFieldsValue():", form.getFieldsValue());
  };

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const fromDate = dateRange[0].$d;
      const toDate = dateRange[1].$d;
      const data = {
        modelName: 'sales',
        data: {
          fromDate: fromDate.toISOString(),
          toDate: toDate.toISOString()
        },
      };

      const queryString = Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key])}`)
        .join('&');

      const response = await axios.get(`http://localhost/v1/sales/salesAggregate/?${queryString}`);
      console.log("🚀 ~ fetchReportData ~ response:", response)
      const { reportByDate, reportByProduct } = response.data; // Adjust here to get data from response.data
      setDataReportByDate(reportByDate);
      setDataReportByProduct(reportByProduct);
    } catch (error) {
      console.error('Failed to fetch report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: t('Product Name'),
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: t('Quantity Sold'),
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: t('Revenue'),
      dataIndex: 'totalSales',
      key: 'totalSales',
    },
    // Thêm các cột khác nếu cần
  ];

  return (
    <div>
      <div className="header-list">
        <div className="title">{t('saleReport')}</div>
        <div className="button-list">
          <BackButton />
          <ExportButton />
        </div>
      </div>
      <div>
        <Form form={form} layout="vertical" style={{ maxWidth: '100%' }} onValuesChange={formChange}>
          <Row gutter={[12]}>
            <Col span={6}>
              <RangePicker name="saleNumber" style={{ width: '100%' }} onChange={(dates) => setDateRange(dates)} />
            </Col>
            <Col span={6}>
              <Button type="primary" onClick={fetchReportData}>{t('viewReport')}</Button>
              <span style={{ color: 'red', marginLeft: 10 }}>{ }</span>
            </Col>
          </Row>

          <div style={{ marginTop: 20 }}>
            <Row gutter={[24]}>
              <Col span={12}>
                <LineChart width={500} height={300} data={dataReportByDate} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Legend />
                  <Tooltip />
                </LineChart>
              </Col>
              <Col span={12}>
                <BarChart width={500} height={300} data={dataReportByProduct}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="productName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalSales" fill="#82ca9d" />
                  <Bar dataKey="totalQuantity" fill="#8884d8" />
                </BarChart>
              </Col>
            </Row>
          </div>

          <Table
            columns={columns}
            dataSource={dataReportByProduct}
            loading={loading}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </Form>
      </div>
    </div>
  );
};

export default ReportSale;
