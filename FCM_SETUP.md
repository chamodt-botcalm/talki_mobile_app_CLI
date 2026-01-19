# FCM (Firebase Cloud Messaging) Setup Instructions

## Installation Steps

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Firebase Console Setup (If not done already)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one
3. Go to Project Settings > General
4. Download `google-services.json` for Android
5. Place it in `android/app/google-services.json` (already done ✓)

### 3. iOS Setup (If targeting iOS)

1. Download `GoogleService-Info.plist` from Firebase Console
2. Place it in `ios/talki__mobile__app/GoogleService-Info.plist`
3. Run: `cd ios && pod install && cd ..`

### 4. Build and Run

#### Android:
```bash
npx react-native run-android
```

#### iOS:
```bash
npx react-native run-ios
```

## Testing FCM Token

1. Launch the app
2. Grant notification permissions when prompted
3. Check console logs for: "FCM Token ready: [your-token]"
4. The token will be automatically sent to your backend

## Update Backend API URL

Edit `src/services/apiService.ts` and replace:
```typescript
const API_BASE_URL = 'YOUR_API_BASE_URL';
```
with your actual backend URL.

## Troubleshooting

### Token is still null?
- Check if notification permissions are granted
- Verify `google-services.json` is in correct location
- Check Firebase Console for correct package name
- Rebuild the app after adding Firebase

### Android Build Errors?
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Clear Cache:
```bash
npx react-native start --reset-cache
```

## Next Steps

After getting the FCM token:
1. Token is logged in console
2. Update `src/services/apiService.ts` with your API endpoint
3. Token will be sent to backend automatically
4. Backend should update the user's `fcmtoken` field
