import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const { reference } = await req.json()
  if (!reference) {
    return new Response(JSON.stringify({ error: "Missing reference" }), { status: 400 })
  }

  const PAYSTACK_SECRET_KEY = "sk_live_0a9727760ecd642a8225a2f45d26b598a0dd2c2e"

  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  })

  const data = await res.json()

  if (data.status && data.data.status === "success") {
    // Optionally: Save donation to your database here
    return new Response(JSON.stringify({ success: true, data: data.data }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ success: false, data }), { status: 400 })
  }
}