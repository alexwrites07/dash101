import axios from 'axios';

class Payment {
  constructor(email, order, amount) {
    this.email = email;
    this.order = order;
    this.amount = amount; // Keep the amount as is for now
  }

  openCheckout() {
    const options = {
      key: 'rzp_test_GpP5Z2LKkBWqPx',
      amount: this.order.amount, // Razorpay expects this in paise (no modification here)
      name: 'KridhaTutor',
      currency: this.order.currency,
      order_id: this.order.id,
      description: 'Payment for adding money to wallet',
      retry: { enabled: true, max_count: 1 },
      prefill: { email: this.email },
      handler: (response) => this.verifyPayment(response),
      theme: { color: '#3399cc' },
    };

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay SDK');
        reject(false);
      };
      document.body.appendChild(script);
    });
  }

  async verifyPayment(response) {
    try {
      console.log(response); // Log the entire response to inspect its structure
  
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response; // Destructure correctly
      const { email, amount } = this;
  
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
  
      // Construct the payload
      const payload = {
        razorpay_order_id: razorpay_order_id,  // Ensure correct field names
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        email,
        amount: amount / 100, // Divide by 100 to match expected format
      };
  
      console.log(payload);  // Log the payload before sending it
  
      // Send the payload to the server
      const verificationResponse = await axios.post(
        'https://server.avyudha.com/verifyPayment',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Handle the server response
      if (verificationResponse.status === 200) {
        alert('Payment verified successfully');
      } else {
        alert(verificationResponse.data.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Error verifying payment');
    }
  }
  
}

export default Payment;
