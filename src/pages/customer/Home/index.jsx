import { Image } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px', borderRadius: 10 }}>
        <Image
          style={{ borderRadius: '10px' }}
          width={'90%'}
          src={`${process.env.PUBLIC_URL}/LogoLanChiHome.png`}
          alt="LAN CHI SHOP"
          preview={false}
        />
      </div>

      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ width: '50%', padding: '30px', textAlign: 'start' }}>
          <h1 style={{ color: 'red' }}>SIÊU THỊ ĐIỆN MÁY LAN CHI</h1>
          <p style={{ fontSize: 18, textAlign: 'justify', marginRight: 30, paddingTop: '-30px' }}>
            Được thành lập năm 2018, là một doanh nghiệp vừa và nhỏ, thực hiện phân phối sản phẩm điện máy tại địa bàn phía Bắc và Đông Bắc phố Hà Nội.
            Siêu thị điện máy Lan Chi đã làm tốt việc kinh doanh và tạo niềm tin tưởng đối với khách hàng, xây dựng cửa hàng siêu thị điện máy bán lẻ vững mạnh để cung cấp sản phẩm đến tay người tiêu dùng.
            Trải qua gần 7 năm hoạt động với chiều sâu kinh nghiệm, siêu thị điện máy Lan Chi trở thành cửa hàng mang đến cho người dân một dịch vụ mua sắm chuyên nghiệp, giá cả ổn định, dịch vụ chu đáo.
          </p>
        </div>
        <div style={{ maxWidth: '40%', width: '200', borderRadius: 10, overflow: 'hidden' }}>
          <Image
            style={{ borderRadius: '10px', objectFit: 'cover', width: '100%', height: '100%' }}
            src={`${process.env.PUBLIC_URL}/LanChi1.png`}
            alt="LAN CHI SHOP"
            preview={false}
          />
        </div>
      </div>

      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '20px', borderRadius: 10 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.133207620099!2d105.84405277521454!3d21.147096480532017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313500e2062b9f69%3A0x241aab147d467f27!2sLan%20Chi%20Supermarket!5e0!3m2!1sen!2s!4v1720450679090!5m2!1sen!2s"
          width="80%"
          height="600"
          style={{ border: '0', borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div style={{ textAlign: 'center'}}>
        <Image
          width={'80%'}
          src={`${process.env.PUBLIC_URL}/LanChi2.png`}
          alt="LAN CHI SHOP"
          preview={false}
        />
      </div>
    </div>
  );
}

export default HomePage;
