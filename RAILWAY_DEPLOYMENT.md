# Railway Deployment Guide

This guide will help you deploy both the backend and frontend of the EO Compliance Analysis to Railway.

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
- Format: `https://your-backend-app.railway.app`
- Test the API: `https://your-backend-app.railway.app/` should return `{"message":"EO Compliance Analysis API"}`

## 🌐 Step 2: Deploy Frontend to Railway

### 2.1 Create Frontend Service
1. **Add New Service**:
   - In your Railway project, click "New Service"
   - Select "Deploy from GitHub repo"
   - Choose the same `danielmaangi/eo-compliance-web` repository

2. **Configure Root Directory**:
   - **Root Directory**: `/` (leave empty for root)
   - Railway will detect `package.json` and use Node.js buildpack

3. **Set Environment Variables**:
   ```
   API_URL = https://your-backend-app.railway.app
   NEXT_PUBLIC_API_URL = https://your-backend-app.railway.app
   ```
   Replace `your-backend-app` with your actual Railway backend service URL.

4. **Deploy**:
   - Railway will automatically build and deploy
   - Wait for build and deployment to complete

### 2.2 Get Frontend URL
- After successful deployment, copy your Railway frontend URL
- Format: `https://your-frontend-app.railway.app`
- Test the frontend: Visit the URL to see the application

## 🔧 Step 3: Test Integration

### 3.1 Test Backend
- Visit: `https://your-backend-app.railway.app/`
- Should return: `{"message":"EO Compliance Analysis API"}`

### 3.2 Test Frontend
- Visit your frontend Railway app URL
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
- **Connection Refused**: Ensure Railway backend URL is correct in frontend env vars
- **Timeout**: Check if Railway app is sleeping (free tier limitation)

## 📝 Environment Variables Reference

### Railway Backend Service
```
PORT=8000  # Automatically set by Railway
```

### Railway Frontend Service
```
API_URL=https://your-backend-app.railway.app
NEXT_PUBLIC_API_URL=https://your-backend-app.railway.app
PORT=3000  # Automatically set by Railway
```

## 🚀 Post-Deployment

1. **Update Repository**: Commit any changes made during deployment
2. **Monitor**: Check Railway dashboard for both services performance
3. **Scale**: Upgrade plans if needed for production usage
4. **Custom Domain**: Configure custom domains in Railway if desired

## 💡 Tips

- **Free Tier Limits**: Railway free tier has usage limits
- **Cold Starts**: First request after inactivity may be slower
- **Logs**: Use Railway dashboard to monitor logs for both services
- **Updates**: Push to GitHub will trigger automatic redeployments

## 🔄 Updating Deployments

### Backend Updates
- Push changes to GitHub
- Railway will automatically redeploy backend service

### Frontend Updates
- Push changes to GitHub
- Railway will automatically redeploy frontend service

### Environment Variable Updates
- Update in Railway dashboard for respective services
- Redeploy if necessary
