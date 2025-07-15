# Railway Deployment Guide

This application consists of two services that need to be deployed separately on Railway:

1. **Python FastAPI Backend** (in `/api` directory)
2. **Next.js Frontend** (in root directory)

## Deployment Steps

### Step 1: Deploy the Python API Backend

1. Create a new Railway project for the backend
2. Connect your GitHub repository
3. Set the **Root Directory** to `api`
4. Railway will automatically detect the Python application and use the `railway.toml` configuration
5. The backend will be deployed with a URL like: `https://your-backend-app.railway.app`

### Step 2: Deploy the Next.js Frontend

1. Create another Railway service in the same project (or a new project)
2. Connect the same GitHub repository
3. Set the **Root Directory** to `.` (root)
4. Add the following environment variable:
   - `API_URL` = `https://your-backend-app.railway.app` (replace with your actual backend URL)
5. Railway will automatically detect the Next.js application and deploy it

### Step 3: Configure Environment Variables

In your **Next.js Frontend** service, add these environment variables:

```
API_URL=https://your-backend-app.railway.app
NODE_ENV=production
```

### Step 4: Update CORS (if needed)

The Python API is configured to allow all origins (`allow_origins=["*"]`). In production, you might want to restrict this to your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-app.railway.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Alternative: Single Service Deployment

If you prefer to deploy as a single service, you can:

1. Move the Python API code to run alongside Next.js
2. Use Next.js API routes to handle the Python functionality
3. Install Python dependencies in the Next.js build process

## Troubleshooting

### Connection Refused Error

If you see `ECONNREFUSED ::1:8000`, it means:
- The frontend is trying to connect to localhost:8000
- The `API_URL` environment variable is not set correctly
- Make sure to set `API_URL` to your Railway backend URL

### Build Failures

- Ensure `requirements.txt` is in the `/api` directory for Python dependencies
- Ensure `package.json` is in the root directory for Node.js dependencies
- Check that `railway.toml` files are correctly configured

### Health Check Failures

- The backend health check hits the `/` endpoint
- Make sure your FastAPI app responds to GET requests at `/`
- Adjust `healthcheckTimeout` if your app takes longer to start

## File Structure

```
/
├── railway.toml              # Next.js frontend config
├── package.json              # Next.js dependencies
├── src/                      # Next.js source code
└── api/
    ├── railway.toml          # Python API config
    ├── requirements.txt      # Python dependencies
    ├── main.py              # FastAPI application
    └── ...
```

## Environment Variables Reference

### Frontend (Next.js)
- `API_URL`: URL of the Python backend service
- `NODE_ENV`: Set to "production"

### Backend (Python)
- `PORT`: Automatically set by Railway
- No additional environment variables needed for basic setup
