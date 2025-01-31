import axios from "axios";

class Payment {
  constructor(email, order, amount) {
    this.email = email;
    this.order = order;
    this.amount = amount * 100; // Convert to paise
  }

  async openCheckout() {
    try {
      // Load Razorpay SDK dynamically
      await this.loadRazorpayScript();

      const options = {
        key: "rzp_live_WgKjXBh4toiJC0", // Replace with actual key_id
        amount: this.amount, // Razorpay expects amount in paise
        currency: this.order.currency,
        name: "KridhaTutor",
        description: "Payment for adding money to wallet",
        order_id: this.order.id, // Razorpay Order ID
        prefill: { email: this.email },
        theme: { color: "#3399cc" },
        handler: (response) => this.verifyPayment(response), // Handle payment success
        retry: { enabled: true, max_count: 1 },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Razorpay SDK failed to load", error);
      alert("Failed to initialize payment. Please try again.");
    }
  }

  async loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  async verifyPayment(response) {
    try {
      console.log("Payment Response:", response);

      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
      const token = localStorage.getItem("token");

      const payload = {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        email: this.email,
        amount: this.amount / 100, // Convert back to rupees
      };

      console.log("Verifying Payment:", payload);

      const verificationResponse = await axios.post(
        "https://server.avyudha.com/verifyPayment",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (verificationResponse.status === 200) {
        alert("Payment verified successfully!");
      } else {
        alert(verificationResponse.data.message || "Payment verification failed.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Payment verification failed. Please contact support.");
    }
  }
}

export default Payment;
