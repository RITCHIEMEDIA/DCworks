import { type NextRequest, NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "sk_test_demo"

export async function GET(request: NextRequest, { params }: { params: { reference: string } }) {
  try {
    const { reference } = params

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    })

    const data = await response.json()

    if (data.status && data.data.status === "success") {
      // Log successful donation
      console.log("Donation completed:", {
        reference: data.data.reference,
        amount: data.data.amount,
        email: data.data.customer.email,
        timestamp: new Date().toISOString(),
        gateway: "paystack",
      })

      return NextResponse.json({
        success: true,
        data: data.data,
        message: "Payment verified successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
