export const htmlContent = (order) => `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">
  <style>
    body {
      font-family: 'Roboto', Arial, Helvetica, sans-serif; /* Đổi font thành Roboto */
      margin: 0;
      padding: 0;
      background-color: #f9f9f9; /* Màu nền cho toàn bộ trang */
    }

    .container {
      width: 800px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      background-color: #ffffff; /* Màu nền cho phần container */
    }

    h2 {
      margin-top: 20px;
      color: #000; /* Màu chữ cho các tiêu đề phụ */
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    /* Cập nhật bảng đầu tiên */
    .no-border-table {
      border: none; /* Xóa viền bảng */
    }

    .no-border-table th, .no-border-table td {
      border: none; /* Xóa viền các ô */
      padding: 10px; /* Thay đổi khoảng cách bên trong các ô */
      background-color: transparent; /* Xóa màu nền của các ô */
      height: 25px; /* Tăng chiều cao của các ô */
    }

    /* Cập nhật bảng thứ hai */
    th, td {
      border: 1px solid #ddd; /* Màu viền của bảng */
      padding: 8px;
      text-align: left;
      color: #000; /* Màu chữ cho bảng */
    }

    th {
      background-color: #f5f5f5; /* Màu nền cho tiêu đề bảng */
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9; /* Màu nền cho các hàng chẵn */
    }

    tr:nth-child(odd) {
      background-color: #ffffff; /* Màu nền cho các hàng lẻ */
    }

    .bold {
      font-weight: bold;
      color: #000; /* Màu chữ cho phần văn bản đậm */
    }

    .right {
      text-align: right;
      color: #000; /* Màu chữ cho phần căn phải */
    }

    .note {
      margin-top: 20px;
      font-size: 14px;
      color: #555; /* Màu chữ cho ghi chú */
    }

    p {
      margin: 10px 0;
      color: #000; /* Màu chữ cho đoạn văn bản */
    }

  </style>
</head>
<body>
<div class="container">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <h2 style="margin: 0;">LANCHISHOP</h2>
  </div>
  
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <div>Địa chỉ: KhốI 2A QL3, Đông Anh, Hà Nội</div>
  </div>
  <h2 style="text-align: center;">HÓA ĐƠN KIÊM PHIẾU BẢO HÀNH</h2>
  <div style="text-align: center;">Ngày...Tháng...Năm</div>
  <div style="text-align: center;">Số đơn hàng: ${order.orderNumber}</div>
  <table class="no-border-table">
    <colgroup>
      <col style="width: 25%;">
      <col style="width: 75%;">
    </colgroup>

    <tr style="font-weight: bold;">
      <td>Khách hàng:</td>
      <td>${order.customer.customerName}</td>
    </tr>
    
    <tr style="font-weight: bold;">
      <td>Số điện thoại:</td>
      <td>${order.customer.phoneNumber}</td>
    </tr>

    <tr style="font-weight: bold;">
      <td>Địa chỉ giao hàng:</td>
      <td>${order.shipTo}</td>
    </tr>

  </table>

  <table width="100%" border="0px" style="border-collapse: collapse; vertical-align: middle;">
    <thead>
      <tr>
        <th>STT</th>
        <th>Sản phẩm</th>
        <th>ĐVT</th>
        <th>Số lượng</th>
        <th>Đơn giá</th>
        <th>Giảm giá</th>
        <th>Thành tiền</th>
        <th>Bảo hành</th>
      </tr>
    </thead>
    <tbody>
    ${order.productList.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.productName}</td>
        <td>Chiếc</td>
        <td>${item.count}</td>
        <td>${item.price}</td>
        <td></td>
        <td>${item.count * item.price}</td>
        <td>${item.warranty}</td>
      </tr>
    `).join('')}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="6" class="right">Tổng</td>
        <td class="right">${order.totalAmount}</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
  <h2>Số tiền viết bằng chữ</h2>
  <p class="bold">${order.totalPriceInWords}</p>
  <h2>Ghi chú:</h2>
  <p class="note">Lưu ý: 1. Quý khách vui lòng kiểm tra kỹ chức năng, hình thức máy, phụ kiện, gói quà tặng trước khi ra về.</p>
  <p class="note">2. Quý khách có thể tra cứu thông tin BH theo đường dẫn sau: https://mobilecity.vn/tra-cuu-bao-hanh</p>
</div>
</body>
</html>
`;
