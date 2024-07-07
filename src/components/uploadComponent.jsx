import React, { useState, useEffect } from 'react';
import { Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ value = [], onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const convertedValue = value.map(file => ({
      ...file,
      url: file.absoluteUrl,
    }));
    setFileList(convertedValue);
  }, [value]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview} // Sử dụng handlePreview trực tiếp vào onPreview
        onChange={handleChange} // onChange cập nhật fileList và gọi hàm onChange
        multiple
        maxCount={10}
        beforeUpload={() => false}
      >
        {fileList.length >= 10 ? null : uploadButton}
      </Upload>
      <Image
        style={{ display: 'none' }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterClose: () => setPreviewImage(''),
        }}
        src={previewImage}
      />
    </>
  );
};

export default ImageUpload;
