import { type NextRequest, NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "sk_test_demo"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (data.status) {
      // Log donation attempt for analytics
      console.log("Donation initiated:", {
        reference: body.reference,
        amount: body.amount,
        email: body.email,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
        message: "Payment initialized successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Payment initialization failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Paystack initialization error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
