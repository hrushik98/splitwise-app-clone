# Authentication Setup Guide

This guide will help you set up Firebase Authentication for the Splitwise Clone app.

## Prerequisites

- Node.js installed
- Expo CLI installed
- A Google account for Firebase

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "splitwise-clone")
4. Follow the setup wizard

### 2. Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Enable **Google** authentication (optional for now)

### 3. Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

### 4. Configure the App

1. Open `/Users/hrushik/Desktop/splitwise-app-clone/splitwise-app-clone/contexts/AuthContext.tsx`
2. Replace the `firebaseConfig` object with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Google Sign-In Setup (Optional)

To enable Google Sign-In, you'll need additional configuration:

### For iOS:

1. In Firebase Console, download `GoogleService-Info.plist`
2. Add it to your iOS project
3. Configure URL schemes in `app.json`

### For Android:

1. In Firebase Console, download `google-services.json`
2. Add it to your Android project
3. Get SHA-1 certificate fingerprint and add to Firebase

### Configuration in app.json:

```json
{
  "expo": {
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    },
    "android": {
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

## Testing Authentication

### Test Email/Password Authentication:

1. Start the app: `npm start`
2. Navigate to the signup screen
3. Create an account with a test email
4. Check your email for verification link
5. Verify your email
6. Try logging in

### Test Password Reset:

1. Go to login screen
2. Click "Forgot Password?"
3. Enter your email
4. Check email for reset link

## Security Best Practices

1. **Never commit Firebase config with real keys to public repositories**
2. Use environment variables for production
3. Set up Firebase Security Rules
4. Enable App Check for additional security
5. Implement rate limiting

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that your API key is correct in `AuthContext.tsx`

### "Firebase: Error (auth/network-request-failed)"
- Check your internet connection
- Verify Firebase project is active

### Email verification not sending
- Check Firebase Console → Authentication → Templates
- Verify email sender is configured

### Google Sign-In not working
- Ensure you've added SHA-1 fingerprint (Android)
- Verify URL schemes are configured (iOS)
- Check that Google Sign-In is enabled in Firebase Console

## App Flow

1. **Splash Screen** → Shows app logo and loading state
2. **Onboarding** → Feature carousel (first-time users only)
3. **Login/Signup** → Authentication screens
4. **Email Verification** → Verify email after signup
5. **Main App** → Access after successful authentication

## Features Implemented

✅ Splash screen with app branding
✅ Onboarding carousel with 3 feature highlights
✅ Login with email/password
✅ Signup with email/password
✅ Forgot password flow
✅ Email verification screen
✅ Google Sign-In UI (requires additional setup)
✅ Persistent authentication state
✅ Onboarding completion tracking

## Next Steps

1. Configure Firebase with your actual project credentials
2. Test the authentication flow
3. Implement Google Sign-In (optional)
4. Add user profile management
5. Integrate with your backend API
