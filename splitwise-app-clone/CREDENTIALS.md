# Test Credentials

For testing the app without Firebase setup, use these hardcoded credentials:

## Login Credentials

- **Email:** `admin@admin.com`
- **Password:** `password`

## Features

- ✅ Login with email/password
- ✅ Signup with email/password (same credentials)
- ✅ Persistent authentication
- ✅ Logout functionality
- ✅ Password reset flow (mock)
- ✅ Email verification (auto-verified)

## Usage

1. Launch the app
2. Complete onboarding (or skip)
3. On login screen, enter:
   - Email: `admin@admin.com`
   - Password: `password`
4. Click "Sign In"

You can also sign up with the same credentials - the mock authentication will accept them.

## Note

This is a temporary mock authentication system for development. To use real Firebase authentication, update the `AuthContext.tsx` file with proper Firebase configuration as described in `AUTHENTICATION_SETUP.md`.
