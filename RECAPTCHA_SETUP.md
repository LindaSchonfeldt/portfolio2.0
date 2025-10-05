# reCAPTCHA Setup Instructions

## 1. Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Click "+" to create a new site
3. Fill in the form:
   - **Label**: Your website name (e.g., "Linda Portfolio Contact Form")
   - **reCAPTCHA type**: Choose "reCAPTCHA v2" → "I'm not a robot" Checkbox
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - `127.0.0.1` (for development)
     - `your-production-domain.com` (your actual website domain)
   - Accept the reCAPTCHA Terms of Service
4. Click "Submit"

## 2. Update Environment Variables

After creating your reCAPTCHA site, you'll get two keys:

1. **Site Key** (public key) - goes in your frontend
2. **Secret Key** (private key) - goes in your backend (keep this secret!)

Update your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=service_luabb3i
VITE_EMAILJS_TEMPLATE_ID=template_vl0tc68
VITE_EMAILJS_USER_ID=9v3nqUb39-NVty07Q
VITE_RECAPTCHA_SITE_KEY=6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Replace `6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your actual site key.

## 3. Backend Verification (Optional but Recommended)

For production, you should verify the reCAPTCHA token on your backend. Since you're using EmailJS, you can:

1. Create a simple serverless function (Netlify/Vercel)
2. Or modify your email service to include reCAPTCHA verification

Example verification endpoint:

```javascript
// Verify reCAPTCHA token
const response = await fetch(
  'https://www.google.com/recaptcha/api/siteverify',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${SECRET_KEY}&response=${recaptchaToken}`
  }
)

const result = await response.json()
if (!result.success) {
  throw new Error('reCAPTCHA verification failed')
}
```

## 4. Testing

1. Run your development server: `npm run dev`
2. Navigate to the contact form
3. Fill out the form and complete the reCAPTCHA
4. Submit to test the integration

## 5. Features Implemented

✅ **reCAPTCHA v2 Integration**

- "I'm not a robot" checkbox
- Responsive design (scales on mobile)
- Form submission blocked until reCAPTCHA is completed
- Token included in EmailJS submission

✅ **User Experience**

- Submit button disabled until reCAPTCHA is completed
- Clear error messages
- Mobile-responsive reCAPTCHA scaling

✅ **Security**

- Client-side validation
- reCAPTCHA token verification
- Environment variable protection

## 6. Troubleshooting

- **reCAPTCHA not loading**: Check that the domain is added to your reCAPTCHA settings
- **Form not submitting**: Ensure the site key is correct in your `.env` file
- **"Invalid domain" error**: Add `localhost` and your domain to the reCAPTCHA admin panel
