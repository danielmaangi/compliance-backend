# Railway Deployment Guide

This guide will help you deploy the EO Compliance Analysis Tool to Railway (backend) and Vercel (frontend).

## 🚂 Step 1: Deploy Backend to Railway

### 1.1 Prepare Railway Account
- Sign up at [railway.app](https://railway.app)
- Connect your GitHub account

### 1.2 Deploy Backend
1. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `danielmaangi/eo-compliance-web`

2. **Configure Root Directory**:
   - In project settings, set **Root Directory** to `api`
   - This tells Railway to deploy only the backend code

3. **Automatic Configuration**:
   - Railway will detect `requirements.txt` and `Procfile`
   - Python buildpack will be automatically selected
   - The start command from `Procfile` will be used

4. **Environment Variables** (Auto-configured):
   - `PORT` - Automatically set by Railway
   - No manual configuration needed

5. **Deploy**:
   - Railway will automatically build and deploy
   - Wait for deployment to complete

### 1.3 Get Backend URL
- After successful deployment, copy your Railway app URL
- Format: `https://your-app-name.railway.app`
- Test the API: `https://your-app-name.railway.app/` should return `{"message":"EO Compliance Analysis API"}`

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Prepare Vercel Account
- Sign up at [vercel.com](https://vercel.com)
- Connect your GitHub account

### 2.2 Deploy Frontend
1. **Import Project**:
   - Click "New Project"
   - Import `danielmaangi/eo-compliance-web`

2. **Configure Build Settings**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `/` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

3. **Set Environment Variables**:
   ```
   API_URL = https://your-railway-app.railway.app
   NEXT_PUBLIC_API_URL = https://your-railway-app.railway.app
   ```
   Replace `your-railway-app` with your actual Railway app name.

4. **Deploy**:
   - Click "Deploy"
   - Wait for build and deployment to complete

## 🔧 Step 3: Test Integration

### 3.1 Test Backend
- Visit: `https://your-railway-app.railway.app/`
- Should return: `{"message":"EO Compliance Analysis API"}`

### 3.2 Test Frontend
- Visit your Vercel app URL
- Upload a test document
- Verify analysis results are returned

### 3.3 Test API Integration
- Check browser developer tools for any CORS errors
- Verify API calls are going to your Railway backend

## 🐛 Troubleshooting

### Backend Issues
- **Build Fails**: Check `requirements.txt` for dependency issues
- **App Crashes**: Check Railway logs for Python errors
- **Port Issues**: Ensure `uvicorn` uses `$PORT` environment variable

### Frontend Issues
- **API Errors**: Verify environment variables are set correctly
- **CORS Issues**: Backend already has CORS configured for all origins
- **Build Fails**: Check for TypeScript or dependency errors

### Integration Issues
- **Connection Refused**: Ensure Railway backend URL is correct in Vercel env vars
- **Timeout**: Check if Railway app is sleeping (free tier limitation)

## 📝 Environment Variables Reference

### Railway (Backend)
```
PORT=8000  # Automatically set by Railway
```

### Vercel (Frontend)
```
API_URL=https://your-railway-app.railway.app
NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app
```

## 🚀 Post-Deployment

1. **Update Repository**: Commit any changes made during deployment
2. **Monitor**: Check Railway and Vercel dashboards for performance
3. **Scale**: Upgrade plans if needed for production usage
4. **Custom Domain**: Configure custom domains in both platforms if desired

## 💡 Tips

- **Free Tier Limits**: Railway free tier has usage limits
- **Cold Starts**: First request after inactivity may be slower
- **Logs**: Use Railway and Vercel dashboards to monitor logs
- **Updates**: Push to GitHub will trigger automatic redeployments

## 🔄 Updating Deployments

### Backend Updates
- Push changes to GitHub
- Railway will automatically redeploy

### Frontend Updates
- Push changes to GitHub
- Vercel will automatically redeploy

### Environment Variable Updates
- Update in respective platform dashboards
- Redeploy if necessary
