# EmailJS Setup Guide for Contact Form

## Step 1: Create EmailJS Account
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

Hello BuzzBites Team,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Interest: {{interest}}

Message:
{{message}}

Best regards,
Contact Form System
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key
1. Go to "Account" in the dashboard
2. Find your **Public Key** (User ID)

## Step 5: Update Environment Variables
Update your `.env.local` file with your actual values:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

## Step 6: Test the Form
1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email for the submission

## Troubleshooting
- Make sure all environment variables are set correctly
- Check the browser console for any error messages
- Verify your EmailJS service is properly configured
- Ensure your email template variables match the ones used in the code

## Security Notes
- The EmailJS free plan has a limit of 200 emails per month
- For production use, consider upgrading to a paid plan
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the client
- This is safe for EmailJS public keys, but don't put sensitive data in these variables


service_rm443gq

template_wweziua

uoGO_-2vpgSbyEmfwv362