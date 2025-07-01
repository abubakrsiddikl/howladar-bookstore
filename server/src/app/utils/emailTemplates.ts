export const orderEmailTemplate = (
  orderId: string,
  total: number,
  customerName: string,
  paymentMethod: string,
  shippingAddress: string,
  phone: string,
  division: string,
  district: string,
  city: string
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #ddd; padding: 20px;">
      <h2 style="color: #4CAF50;">📦 New Order Received!</h2>
      <p>Hello,</p>

      <h3 style="color:#333;">Order Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Order ID:</td>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>${orderId}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Customer Name:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Phone:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Shipping Address:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${shippingAddress},উপজেলা: ${city}, জেলা: ${district}, বিভাগ : ${division} </td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Payment Method:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${paymentMethod}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Total Amount:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">৳${total}</td>
        </tr>
      </table>

      <p style="margin-top:20px;">Please check your dashboard for full order details.</p>

      <p style="margin-top:20px;">Thanks,<br><strong>Howladar Bookstore</strong></p>

      <div style="margin-top:30px; font-size:12px; color:gray;">
        This is an automated email. Please do not reply.
      </div>
    </div>
  `;
};
