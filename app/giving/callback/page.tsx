"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { paymentService } from "@/lib/payment"

export default function PaymentCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [paymentData, setPaymentData] = useState<any>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference")
      const trxref = searchParams.get("trxref") // Paystack reference

      if (!reference && !trxref) {
        setStatus("failed")
        return
      }

      try {
        const result = await paymentService.verifyPayment(reference || trxref || "", "paystack")

        if (result.success) {
          setStatus("success")
          setPaymentData(result.data)
        } else {
          setStatus("failed")
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setStatus("failed")
      }
    }

    verifyPayment()
  }, [searchParams])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your donation...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Thank you for your generous donation to Dominion City Works Layout.</p>
            {paymentData && (
              <div className="bg-green-50 p-4 rounded-lg text-left">
                <div className="text-sm space-y-1">
                  <div>
                    <strong>Amount:</strong> ₦{(paymentData.amount / 100).toLocaleString()}
                  </div>
                  <div>
                    <strong>Reference:</strong> {paymentData.reference}
                  </div>
                  <div>
                    <strong>Date:</strong> {new Date(paymentData.paid_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-500">A receipt has been sent to your email address.</p>
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/">Return Home</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/giving">Give Again</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <CardTitle className="text-red-600">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">We couldn't process your donation at this time. Please try again.</p>
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/giving">Try Again</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
