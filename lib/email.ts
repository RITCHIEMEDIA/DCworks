// Email service for automated communications
export interface EmailData {
  to: string
  subject: string
  template: string
  data: Record<string, any>
}

export interface NewsletterSubscription {
  email: string
  name?: string
  preferences?: string[]
}

class EmailService {
  private apiKey = process.env.SENDGRID_API_KEY || "demo_key"
  private fromEmail = "info@dominioncityworks.org"

  // Send welcome email to new members
  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: email,
        subject: "Welcome to Dominion City Works Layout Family!",
        template: "welcome",
        data: {
          name,
          churchName: "Dominion City Works Layout",
          location: "97 Works Layout, Owerri Municipal, Owerri, Imo State",
          serviceTime: "Sundays at 10:30 AM",
          websiteUrl: "https://dominioncityworks.org",
        },
      }

      return await this.sendEmail(emailData)
    } catch (error) {
      console.error("Welcome email error:", error)
      return false
    }
  }

  // Send donation receipt
  async sendDonationReceipt(
    email: string,
    name: string,
    amount: number,
    fund: string,
    reference: string,
    date: string,
  ): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: email,
        subject: "Donation Receipt - Dominion City Works Layout",
        template: "donation_receipt",
        data: {
          name,
          amount: amount.toLocaleString(),
          fund,
          reference,
          date,
          churchName: "Dominion City Works Layout",
          taxDeductible: true,
        },
      }

      return await this.sendEmail(emailData)
    } catch (error) {
      console.error("Donation receipt error:", error)
      return false
    }
  }

  // Send event reminder
  async sendEventReminder(
    email: string,
    name: string,
    eventName: string,
    eventDate: string,
    eventTime: string,
    location: string,
  ): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: email,
        subject: `Reminder: ${eventName} - Tomorrow!`,
        template: "event_reminder",
        data: {
          name,
          eventName,
          eventDate,
          eventTime,
          location,
          churchName: "Dominion City Works Layout",
        },
      }

      return await this.sendEmail(emailData)
    } catch (error) {
      console.error("Event reminder error:", error)
      return false
    }
  }

  // Send newsletter
  async sendNewsletter(
    subscribers: string[],
    subject: string,
    content: string,
    featuredImage?: string,
  ): Promise<boolean> {
    try {
      const promises = subscribers.map((email) => {
        const emailData: EmailData = {
          to: email,
          subject,
          template: "newsletter",
          data: {
            content,
            featuredImage,
            churchName: "Dominion City Works Layout",
            unsubscribeUrl: `https://dominioncityworks.org/unsubscribe?email=${email}`,
          },
        }
        return this.sendEmail(emailData)
      })

      const results = await Promise.all(promises)
      return results.every((result) => result === true)
    } catch (error) {
      console.error("Newsletter send error:", error)
      return false
    }
  }

  // Subscribe to newsletter
  async subscribeToNewsletter(subscription: NewsletterSubscription): Promise<boolean> {
    try {
      // Store subscription in database (using localStorage for demo)
      const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]")

      // Check if already subscribed
      const existingIndex = subscribers.findIndex((sub: any) => sub.email === subscription.email)

      if (existingIndex >= 0) {
        subscribers[existingIndex] = subscription
      } else {
        subscribers.push({
          ...subscription,
          subscribedAt: new Date().toISOString(),
          active: true,
        })
      }

      localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers))

      // Send welcome email
      if (subscription.name) {
        await this.sendWelcomeEmail(subscription.email, subscription.name)
      }

      return true
    } catch (error) {
      console.error("Newsletter subscription error:", error)
      return false
    }
  }

  // Core email sending function
  private async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // In production, this would integrate with SendGrid, Mailgun, etc.
      // For demo purposes, we'll log the email
      console.log("Email sent:", {
        to: emailData.to,
        subject: emailData.subject,
        template: emailData.template,
        timestamp: new Date().toISOString(),
      })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return true
    } catch (error) {
      console.error("Email send error:", error)
      return false
    }
  }
}

export const emailService = new EmailService()
