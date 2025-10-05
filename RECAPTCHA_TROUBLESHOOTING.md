# 🔧 reCAPTCHA Troubleshooting Guide

## Common Issues and Solutions

### 1. **reCAPTCHA Not Appearing**

**Check these steps:**

1. **Verify script is loaded**:

   - Open browser dev tools (F12)
   - Go to Network tab
   - Look for `recaptcha/api.js` - should load successfully
   - If not loading, check your internet connection

2. **Check console for errors**:
   - Open Console tab in dev tools
   - Look for reCAPTCHA-related errors
   - Common errors:
     - `Invalid domain for site key`
     - `Site key is invalid`

### 2. **"Invalid domain" Error**

**Solution**: Add your domain to reCAPTCHA admin console:

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Select your site
3. Add these domains:
   - `localhost` (for development)
   - `127.0.0.1` (for development)
   - `192.168.1.68` (your network IP if using --host)
   - Your production domain

### 3. **reCAPTCHA Loads but Doesn't Work**

**Debug steps**:

1. **Check site key**:

   ```javascript
   // Open browser console and run:
   console.log('Site key:', import.meta.env.VITE_RECAPTCHA_SITE_KEY)
   ```

2. **Check if token is generated**:
   - Complete the reCAPTCHA
   - Check console for: "reCAPTCHA token received: Yes"

### 4. **Environment Variable Issues**

**Verify your `.env` file**:

```env
VITE_RECAPTCHA_SITE_KEY=6LeEOd8rAAAAAIqkcw5ZHO9mZPsE0_oVIf6o7d80
```

**Important**:

- No quotes around the value
- No spaces around the `=`
- Restart your dev server after changing `.env`

### 5. **Site Key vs Secret Key**

**Make sure you're using the correct key**:

- ✅ **Site Key**: Starts with `6Le...` (public, goes in frontend)
- ❌ **Secret Key**: Starts with `6Lf...` (private, backend only)

### 6. **Development vs Production**

**Development (localhost)**:

- Use your real site key
- Add `localhost` to allowed domains

**Production**:

- Use the same site key
- Add your production domain to allowed domains

## 🔍 **Debug Your Current Setup**

Run this in your browser console on the contact page:

```javascript
// Check if reCAPTCHA is loaded
console.log('reCAPTCHA loaded:', typeof window.grecaptcha !== 'undefined')

// Check site key
console.log('Site key configured:', !!import.meta.env.VITE_RECAPTCHA_SITE_KEY)

// Check current domain
console.log('Current domain:', window.location.hostname)
```

## 📝 **Updated Implementation Features**

Your ContactForm now includes:

✅ **Enhanced Error Handling**:

- Shows specific error messages
- Handles reCAPTCHA failures gracefully
- Displays configuration errors

✅ **Better Debugging**:

- Console logs for troubleshooting
- Clear error messages for users
- Token validation feedback

✅ **Improved UX**:

- Error messages below reCAPTCHA
- Better visual feedback
- Handles expired tokens

## 🚀 **Quick Test**

1. Open your contact form: `http://localhost:5174/contact`
2. Open browser dev tools (F12) → Console tab
3. Try to submit the form
4. Check console messages for debugging info

## 📞 **Need Help?**

If reCAPTCHA still isn't working:

1. **Share console errors**: Copy any red error messages
2. **Verify domain setup**: Screenshot of your reCAPTCHA admin domains
3. **Check network**: Ensure `recaptcha/api.js` loads in Network tab
