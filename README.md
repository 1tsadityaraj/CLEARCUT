# ClearCut - AI Background Remover

A production-ready full-stack AI SaaS application that allows users to remove image backgrounds automatically using AI. Built with React, Node.js, and Integrations with Remove.bg, Cloudinary, and Razorpay.

## Features
- 🎨 **Modern SaaS UI**: Built with React, Vite, and Tailwind CSS.
- 🔐 **Authentication**: Secure JWT-based auth with Login/Signup.
- 🖼️ **Drag & Drop Upload**: Easy to use interface.
- ⚡ **AI Processing**: Removes backgrounds instantly using remove.bg API.
- ☁️ **Cloud Storage**: Stores original and processed images on Cloudinary.
- 💳 **Payment Integration**: Razorpay integration for credit purchases (Code ready).
- 📱 **Responsive**: Mobile-friendly design.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Services**: Remove.bg (AI), Cloudinary (Storage), Razorpay (Payments)

## 🚀 Stability First Mode (Default)
The application comes pre-configured in **Stability First Mode**. It will run immediately without crashing, even if you are missing API keys or a local database.

- **Mock Auth**: If MongoDB is missing, login with *any* password to enter "Mock User" mode.
- **Mock Processing**: If API keys are missing, uploads return a demo result to verify the UI flow.
- **Free Tier UI**: Payments are disabled by default (`ENABLE_PAYMENTS=false`), hiding upgrade options.

## Prerequisites
- Node.js (v14+)
- **Optional for Mock Mode**: MongoDB, Cloudinary, Remove.bg, Razorpay Keys
- **Required for Production**: MongoDB, Valid API Keys

## Setup Instructions

### 1. Clone & Install Dependencies
```bash
# Install Root (if any)
npm install

# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Environment Variables
A `.env` file is already provided for the server with safe defaults.
To enable real features, edit `server/.env` and add your keys:

```env
NODE_ENV=development
PORT=5002
MONGO_URI=mongodb://localhost:27017/removebg_app

# Add these for Real AI & Storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REMOVE_BG_API_KEY=

# Add these for Payments
ENABLE_PAYMENTS=true
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### 3. Run Locally

**Start Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5002
```

**Start Frontend:**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

## Deployment Guide

### Backend (Render/Heroku/Railway)
1. Push code to GitHub.
2. Connect repository to deployment provider.
3. Set `Root Directory` to `server`.
4. Set Build Command: `npm install`.
5. Set Start Command: `node server.js` (or `npm start`).
6. Add all Environment Variables in the dashboard.

### Frontend (Vercel/Netlify)
1. Push code to GitHub.
2. Connect repository to Vercel.
3. Set `Root Directory` to `client`.
4. Set Build Command: `npm run build`.
5. Set Output Directory: `dist`.
6. **Important**: Update the API URL in `client/src/context/AuthContext.jsx` to point to your deployed backend URL instead of localhost.

## Project Structure
```
root/
├── client/         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
├── server/         # Node.js Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── app.js
```
