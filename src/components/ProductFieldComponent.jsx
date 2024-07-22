import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import { apiGetList } from '~/services/helperServices';
import { t } from 'i18next';

const { Option } = Select;

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keySearch, setKeySearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!keySearch) return; // Chỉ fetch nếu có keySearch

      setLoading(true);
      const data = {
        modelName: 'products',
        data: {},
        keySearch,
        perPage: 10,
      };
      try {
        const response = await apiGetList(data);
        setProducts(response.dataObject);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keySearch]); // Thêm keySearch vào dependencies của useEffect

  const handleSearch = (value) => {
    setKeySearch(value); // Cập nhật keySearch khi giá trị trong ô search thay đổi
  };

  return (
    <Select
      showSearch
      placeholder={t('selectProduct')}
      onSearch={handleSearch} // Gọi handleSearch khi người dùng nhập vào ô search
      filterOption={false} // Tắt filter mặc định của Select
      notFoundContent={loading ? <Spin size="small" /> : null}
      style={{ width: '100%' }}
    >
      {products.map((product) => (
        <Option key={product._id} value={product._id}>
          {product.productName}
        </Option>
      ))}
    </Select>
  );
};

export default ProductSearch;
