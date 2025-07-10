import { type NextRequest, NextResponse } from "next/server"

const TERMII_API_KEY = process.env.TERMII_API_KEY || "demo_key"
const TERMII_BASE_URL = "https://api.ng.termii.com/api/sms/send"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.to || !body.sms) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number and message are required",
        },
        { status: 400 },
      )
    }

    // Send SMS via Termii (popular Nigerian SMS service)
    const response = await fetch(TERMII_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: body.to,
        from: body.from || "DominionCity",
        sms: body.sms,
        type: "plain",
        api_key: TERMII_API_KEY,
        channel: "generic",
      }),
    })

    const data = await response.json()

    if (response.ok) {
      // Log SMS for analytics
      console.log("SMS sent successfully:", {
        to: body.to,
        message_id: data.message_id,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message_id: data.message_id,
        message: "SMS sent successfully",
      })
    } else {
      console.error("SMS send failed:", data)
      return NextResponse.json(
        {
          success: false,
          message: data.message || "SMS send failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("SMS API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
