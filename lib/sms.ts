// SMS service for Nigerian mobile networks
export interface SMSData {
  to: string
  message: string
  type: "reminder" | "welcome" | "alert" | "notification"
}

class SMSService {
  private apiKey = process.env.TERMII_API_KEY || "demo_key"
  private senderId = "DominionCity"

  // Send event reminder SMS
  async sendEventReminder(
    phone: string,
    name: string,
    eventName: string,
    eventDate: string,
    eventTime: string,
  ): Promise<boolean> {
    const message = `Hi ${name}! Reminder: ${eventName} is tomorrow (${eventDate}) at ${eventTime}. See you there! - Dominion City Works Layout`

    return await this.sendSMS({
      to: this.formatPhoneNumber(phone),
      message,
      type: "reminder",
    })
  }

  // Send welcome SMS to new members
  async sendWelcomeSMS(phone: string, name: string): Promise<boolean> {
    const message = `Welcome to Dominion City Works Layout, ${name}! We're excited to have you in our family. Join us Sundays at 10:30 AM. God bless!`

    return await this.sendSMS({
      to: this.formatPhoneNumber(phone),
      message,
      type: "welcome",
    })
  }

  // Send prayer request confirmation
  async sendPrayerConfirmation(phone: string, name: string): Promise<boolean> {
    const message = `Hi ${name}, we've received your prayer request. Our prayer team is lifting you up. God hears and answers prayers! - Dominion City`

    return await this.sendSMS({
      to: this.formatPhoneNumber(phone),
      message,
      type: "notification",
    })
  }

  // Send donation thank you SMS
  async sendDonationThankYou(phone: string, name: string, amount: number): Promise<boolean> {
    const message = `Thank you ${name} for your generous donation of ₦${amount.toLocaleString()}. Your giving makes a difference! God bless you. - Dominion City`

    return await this.sendSMS({
      to: this.formatPhoneNumber(phone),
      message,
      type: "notification",
    })
  }

  // Send emergency/urgent notifications
  async sendUrgentNotification(phones: string[], message: string): Promise<boolean> {
    try {
      const promises = phones.map((phone) =>
        this.sendSMS({
          to: this.formatPhoneNumber(phone),
          message: `URGENT: ${message} - Dominion City Works Layout`,
          type: "alert",
        }),
      )

      const results = await Promise.all(promises)
      return results.every((result) => result === true)
    } catch (error) {
      console.error("Urgent notification error:", error)
      return false
    }
  }

  // Core SMS sending function
  private async sendSMS(smsData: SMSData): Promise<boolean> {
    try {
      // In production, integrate with Termii, Infobip, or other Nigerian SMS providers
      const response = await fetch("/api/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: smsData.to,
          from: this.senderId,
          sms: smsData.message,
          type: "plain",
          api_key: this.apiKey,
        }),
      })

      const result = await response.json()

      // Log SMS for analytics
      console.log("SMS sent:", {
        to: smsData.to,
        type: smsData.type,
        timestamp: new Date().toISOString(),
        success: result.success || false,
      })

      return result.success || false
    } catch (error) {
      console.error("SMS send error:", error)
      return false
    }
  }

  // Format phone number for Nigerian networks
  private formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "")

    // Handle different Nigerian phone number formats
    if (cleaned.startsWith("234")) {
      return cleaned // Already in international format
    } else if (cleaned.startsWith("0")) {
      return "234" + cleaned.substring(1) // Remove leading 0 and add country code
    } else if (cleaned.length === 10) {
      return "234" + cleaned // Add country code
    }

    return cleaned
  }

  // Validate Nigerian phone number
  isValidNigerianNumber(phone: string): boolean {
    const formatted = this.formatPhoneNumber(phone)

    // Nigerian mobile numbers start with 234 followed by specific prefixes
    const nigerianPrefixes = [
      "234701",
      "234702",
      "234703",
      "234704",
      "234705",
      "234706",
      "234707",
      "234708",
      "234709",
      "234802",
      "234803",
      "234804",
      "234805",
      "234806",
      "234807",
      "234808",
      "234809",
      "234810",
      "234811",
      "234812",
      "234813",
      "234814",
      "234815",
      "234816",
      "234817",
      "234818",
      "234819",
      "234901",
      "234902",
      "234903",
      "234904",
      "234905",
      "234906",
      "234907",
      "234908",
      "234909",
    ]

    return nigerianPrefixes.some((prefix) => formatted.startsWith(prefix)) && formatted.length === 13
  }
}

export const smsService = new SMSService()
