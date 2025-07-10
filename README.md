# Dominion City Works Layout - Greatness Centre Website

A modern, responsive church website built with Next.js, TypeScript, and Tailwind CSS, designed to serve the Dominion City Works Layout community in Owerri, Imo State, Nigeria.

## 🌟 Features

### Core Features
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Service Information**: Detailed service times, locations, and what to expect
- **Event Management**: Comprehensive event listing, registration, and calendar integration
- **Sermon Archive**: Searchable sermon library with audio/video streaming
- **Online Giving**: Secure donation platform with Nigerian payment gateways (Paystack/Flutterwave)
- **Ministry Pages**: Detailed information about all church ministries and programs
- **Contact System**: Multi-channel contact forms and staff directory
- **Blog System**: Dynamic content management for news and articles

### Advanced Features
- **Member Portal**: Personalized dashboard for registered members
- **Admin Panel**: Content management system for church staff
- **Live Streaming**: Real-time worship service broadcasting
- **Interactive Learning**: Quizzes and educational content
- **Social Media Integration**: Live feeds from church social media accounts
- **Email Automation**: Automated welcome emails, receipts, and newsletters
- **SMS Notifications**: Event reminders and important announcements
- **Analytics Dashboard**: Comprehensive website and engagement analytics
- **SEO Optimization**: Full search engine optimization with structured data

## 🚀 Technology Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4, Vercel Analytics
- **Payment**: Paystack, Flutterwave
- **Email**: SendGrid
- **SMS**: Termii
- **Deployment**: Vercel

## 📍 Church Information

**Dominion City Works Layout - Greatness Centre**
- **Address**: 97 Works Layout, Owerri Municipal, Owerri, Imo State, Nigeria
- **Phone**: +234-803-123-4567
- **Email**: info@dominioncityworks.org
- **Website**: https://dominioncityworks.org

### Service Times
- **Sunday First Service**: 8:00 AM - 9:30 AM
- **Sunday Main Service**: 10:30 AM - 12:30 PM (Most Popular)
- **Sunday Evening Service**: 6:00 PM - 7:30 PM
- **Wednesday Prayer Meeting**: 7:00 PM - 8:30 PM

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/dominioncityworks/website.git
   cd website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update the environment variables in `.env.local` with your actual values.

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Deployment

#### Deploy to Vercel (Recommended)

1. **Connect to Vercel**
   \`\`\`bash
   npm install -g vercel
   vercel login
   vercel
   \`\`\`

2. **Configure Environment Variables**
   Add all required environment variables in the Vercel dashboard.

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

## 📁 Project Structure

\`\`\`
dominion-city-website/
├── app/                          # Next.js app directory
│   ├── (pages)/                  # Page components
│   ├── api/                      # API routes
│   ├── admin/                    # Admin panel
│   ├── member-dashboard/         # Member portal
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # UI components
│   ├── header.tsx               # Site header
│   └── footer.tsx               # Site footer
├── lib/                         # Utility libraries
│   ├── analytics.ts             # Analytics utilities
│   ├── email.ts                 # Email service
│   ├── payment.ts               # Payment integration
│   ├── sms.ts                   # SMS service
│   └── seo.ts                   # SEO utilities
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vercel.json                 # Vercel deployment config
└── README.md                   # Project documentation
\`\`\`

## 🔧 Configuration

### Payment Gateway Setup

#### Paystack (Primary)
1. Create account at [paystack.com](https://paystack.com)
2. Get API keys from dashboard
3. Add to environment variables:
   \`\`\`
   PAYSTACK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
   \`\`\`

#### Flutterwave (Backup)
1. Create account at [flutterwave.com](https://flutterwave.com)
2. Get API keys from dashboard
3. Add to environment variables

### Email Service Setup (SendGrid)
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Verify sender identity
3. Get API key and add to environment variables

### SMS Service Setup (Termii)
1. Create account at [termii.com](https://termii.com)
2. Get API key and sender ID
3. Add to environment variables

### Analytics Setup
1. Create Google Analytics 4 property
2. Get tracking ID
3. Add to environment variables

## 👥 User Roles & Permissions

### Public Users
- View all public content
- Register for events
- Make donations
- Submit contact forms
- Subscribe to newsletter

### Members
- Access member portal
- View giving history
- Track event attendance
- Take interactive quizzes
- Manage notification preferences

### Administrators
- Full content management
- User management
- Analytics access
- Payment management
- System configuration

## 📊 Analytics & Monitoring

### Tracked Metrics
- **Traffic**: Page views, unique visitors, session duration
- **Engagement**: Event registrations, sermon plays, blog reads
- **Conversions**: Donations, newsletter signups, contact forms
- **Performance**: Page load times, Core Web Vitals
- **User Behavior**: Click tracking, scroll depth, form interactions

### Performance Monitoring
- Real-time performance tracking
- Core Web Vitals monitoring
- API response time tracking
- Error logging and reporting

## 🔒 Security Features

- **HTTPS Enforcement**: All traffic encrypted
- **Content Security Policy**: XSS protection
- **Input Validation**: Server-side validation for all forms
- **Rate Limiting**: API endpoint protection
- **Secure Headers**: Security headers implementation
- **Data Encryption**: Sensitive data encryption

## 🌍 SEO Optimization

### Technical SEO
- **Structured Data**: Schema.org markup for church, events, articles
- **Meta Tags**: Optimized title, description, and social media tags
- **Sitemap**: Automated XML sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Page Speed**: Optimized for fast loading times

### Content SEO
- **Keyword Optimization**: Targeted keywords for local search
- **Local SEO**: Google My Business integration
- **Content Strategy**: Regular blog posts and updates
- **Image Optimization**: Alt tags and compressed images

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch-Friendly**: Optimized for touch interactions
- **Fast Loading**: Optimized for mobile networks
- **Progressive Web App**: PWA features for app-like experience

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines before submitting pull requests.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Conventional commits for commit messages

## 📞 Support

For technical support or questions:
- **Email**: tech@dominioncityworks.org
- **Phone**: +234-803-123-4567
- **GitHub Issues**: [Create an issue](https://github.com/dominioncityworks/website/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Church Leadership**: For their vision and support
- **Development Team**: For their dedication and expertise
- **Community**: For their feedback and contributions
- **Open Source**: For the amazing tools and libraries used

---

**Built with ❤️ for the Dominion City Works Layout community**

*Transforming lives, building communities, and cultivating greatness through faith, love, and service.*
