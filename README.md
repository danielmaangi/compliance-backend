# EO Compliance Analysis

A comprehensive document analysis tool built with Next.js frontend and Python FastAPI backend for analyzing documents for compliance-related keywords.

## 🚀 Features

- **File Upload**: Drag-and-drop interface supporting PDF, DOCX, and Excel files
- **Keyword Analysis**: Analyzes documents for compliance-related terms including gender, diversity, equity, inclusion, and more
- **Real-time Results**: Displays analysis results with statistics and detailed matches
- **CSV Export**: Download complete analysis results as CSV
- **Modern UI**: Clean, responsive interface built with shadcn/ui components
- **Fast Processing**: Efficient document processing with Python backend

## 🛠 Tech Stack

### Frontend
- **Next.js 15** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** icons

### Backend
- **FastAPI** for API endpoints
- **Python 3.12** with async support
- **pypdf** for PDF processing
- **python-docx** for Word documents
- **openpyxl** for Excel files
- **pandas** for data processing

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.12+
- Git

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/danielmaangi/eo-compliance-web.git
cd eo-compliance-web
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd api
pip install -r requirements.txt
cd ..
```

### 4. Start the Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```
The frontend will be available at http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd api
python -m uvicorn main:app --reload --port 8000
```
The API will be available at http://localhost:8000

## 📁 Project Structure

```
eo-compliance-web/
├── src/
│   ├── app/
│   │   ├── api/analyze/          # Next.js API routes
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main page
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   └── FileUpload.tsx        # File upload component
│   └── lib/
│       └── utils.ts              # Utility functions
├── api/
│   ├── main.py                   # FastAPI application
│   ├── analyze.py                # Vercel handler (legacy)
│   └── requirements.txt          # Python dependencies
├── public/                       # Static assets
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── components.json              # shadcn/ui configuration
└── package.json                 # Node.js dependencies
```

## 🔧 Configuration

### Keywords
The system analyzes documents for the following compliance keywords:
- Gender-related: gender, transgender, transmen, transwomen, lgbtq, lgbt
- Diversity & Inclusion: dei, diversity, equity, inclusion, inclusivity
- Identity: identity, binary, non-binary, pronouns
- Health & Rights: gbv, abortion, hormone, dreams
- Populations: key pops, key populations, fsw, tgw
- And more...

### Supported File Types
- **PDF** (.pdf)
- **Word Documents** (.docx)
- **Excel Files** (.xlsx, .xls)

## 🔄 API Endpoints

### `GET /`
Health check endpoint

### `POST /analyze`
Analyzes uploaded files for compliance keywords

**Request Body:**
```json
{
  "files": [
    {
      "filename": "document.pdf",
      "content": "base64_encoded_content"
    }
  ]
}
```

**Response:**
```json
{
  "total_matches": 15,
  "files_processed": 1,
  "keywords_found": 8,
  "results": [
    {
      "file_path": "document.pdf",
      "source_type": "page",
      "source_name": "Page 1",
      "location": "Page 1",
      "keyword": "gender",
      "exact_sentence": "The policy addresses gender equality...",
      "partner": "document"
    }
  ]
}
```

## 🚀 Deployment

Both frontend and backend are deployed on Railway for simplified management.

### Backend (Railway) - Deploy First
1. **Create Railway Account**: Sign up at [railway.app](https://railway.app)
2. **Deploy Backend**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Choose the `api` folder as the root directory
   - Railway will automatically detect Python and use the Procfile
3. **Configure Environment**:
   - Railway will automatically set the `PORT` variable
   - No additional environment variables needed for basic setup
4. **Get Backend URL**: After deployment, copy your Railway app URL (e.g., `https://your-backend-app.railway.app`)

### Frontend (Railway) - Deploy Second
1. **Add Frontend Service**:
   - In your Railway project, click "New Service"
   - Select "Deploy from GitHub repo"
   - Choose the same repository
   - Leave root directory empty (uses project root)
2. **Configure Environment Variables**:
   - Add `API_URL` = `https://your-backend-app.railway.app`
   - Add `NEXT_PUBLIC_API_URL` = `https://your-backend-app.railway.app`
3. **Deploy**: Railway will automatically build and deploy

### Environment Variables Setup
Copy `.env.example` to `.env.local` and update with your Railway backend URL:
```bash
cp .env.example .env.local
# Edit .env.local with your Railway backend URL
```

See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📝 License

This project is private and proprietary.

## 🐛 Issues & Support

For issues and support, please create an issue in the GitHub repository.

## 🤖 CI/CD & Automation

This project includes comprehensive GitHub Actions workflows for:

- **Continuous Integration**: Automated testing, linting, and security scanning
- **Continuous Deployment**: Automatic deployment to Railway (both backend and frontend)
- **Pull Request Validation**: Code quality checks and automated PR comments
- **Dependency Management**: Weekly automated dependency updates
- **Security Monitoring**: Vulnerability scanning and automated issue creation

See [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md) for detailed documentation.

## 🔄 Recent Updates

- ✅ Fixed Next.js configuration warnings
- ✅ Migrated from Pages Router to App Router
- ✅ Implemented proper FastAPI backend
- ✅ Added comprehensive error handling
- ✅ Enhanced UI with shadcn/ui components
- ✅ Added drag-and-drop file upload
- ✅ Implemented CSV export functionality
- ✅ Added GitHub Actions CI/CD pipelines
- ✅ Configured automated deployment workflows
- ✅ Implemented security scanning and dependency updates
