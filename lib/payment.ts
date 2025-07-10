// Payment gateway integration for Nigerian market
export interface PaymentData {
  amount: number
  email: string
  name: string
  phone: string
  fund: string
  frequency: "one-time" | "weekly" | "monthly"
  reference: string
}

export interface PaymentResponse {
  success: boolean
  reference: string
  message: string
  authorization_url?: string
}

class PaymentService {
  private paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_demo"
  private flutterwavePublicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-demo"

  // Paystack integration for Nigerian payments
  async initializePaystackPayment(data: PaymentData): Promise<PaymentResponse> {
    try {
      const response = await fetch("/api/payments/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: data.amount * 100, // Convert to kobo
          email: data.email,
          reference: data.reference,
          metadata: {
            name: data.name,
            phone: data.phone,
            fund: data.fund,
            frequency: data.frequency,
          },
          callback_url: `${window.location.origin}/giving/callback`,
        }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Payment initialization error:", error)
      return {
        success: false,
        reference: data.reference,
        message: "Payment initialization failed. Please try again.",
      }
    }
  }

  // Flutterwave integration as backup
  async initializeFlutterwavePayment(data: PaymentData): Promise<PaymentResponse> {
    try {
      const response = await fetch("/api/payments/flutterwave/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: data.amount,
          currency: "NGN",
          email: data.email,
          phone_number: data.phone,
          name: data.name,
          tx_ref: data.reference,
          redirect_url: `${window.location.origin}/giving/callback`,
          meta: {
            fund: data.fund,
            frequency: data.frequency,
          },
        }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Flutterwave payment error:", error)
      return {
        success: false,
        reference: data.reference,
        message: "Payment initialization failed. Please try again.",
      }
    }
  }

  // Generate unique payment reference
  generateReference(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    return `DC_${timestamp}_${random}`
  }

  // Verify payment status
  async verifyPayment(reference: string, provider: "paystack" | "flutterwave"): Promise<any> {
    try {
      const response = await fetch(`/api/payments/${provider}/verify/${reference}`)
      return await response.json()
    } catch (error) {
      console.error("Payment verification error:", error)
      return { success: false, message: "Payment verification failed" }
    }
  }
}

export const paymentService = new PaymentService()
