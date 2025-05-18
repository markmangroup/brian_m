# Brian M React App

This project uses Firebase for authentication and data storage. Firebase configuration is provided via environment variables so secrets are not committed to source control.

## Setup

1. Copy `.env.example` to `.env` (or create a new `.env` file).
2. Fill in your Firebase details in the file:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

The `.env` file is ignored by git, so your credentials remain private.

## Running the app

Install dependencies and start the development server:

```bash
npm install
npm start
```

The app will load Firebase settings from the environment variables defined above.
