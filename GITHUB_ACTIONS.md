# GitHub Actions CI/CD Documentation

This document explains the GitHub Actions workflows configured for the EO Compliance Analysis Tool.

## 🚀 Workflows Overview

### 1. CI/CD Pipeline (`ci-cd.yml`)
**Trigger**: Push to `main`/`develop`, Pull Requests to `main`

**Jobs**:
- **Frontend Tests & Build**: ESLint, TypeScript checking, Next.js build
- **Backend Tests & Validation**: Python linting, API startup tests, endpoint validation
- **Security Scanning**: Trivy vulnerability scanner
- **Deploy Backend**: Automatic Railway deployment on main branch
- **Deploy Frontend**: Automatic Vercel deployment on main branch
- **Integration Tests**: Post-deployment health checks
- **Notifications**: Deployment status updates

### 2. Pull Request Validation (`pr-validation.yml`)
**Trigger**: Pull Requests opened/updated

**Jobs**:
- **Code Quality & Linting**: ESLint, Prettier, Python linting (flake8, black, isort)
- **Build & Test**: TypeScript checking, frontend build, backend startup
- **Security Check**: npm audit, Python safety check
- **Dependency Analysis**: Outdated packages, vulnerability scanning
- **PR Size Check**: Warns about large PRs
- **PR Comment**: Automated status updates on PR

### 3. Dependency Updates (`dependency-update.yml`)
**Trigger**: Weekly schedule (Mondays 9 AM UTC), Manual dispatch

**Jobs**:
- **NPM Dependencies**: Automated npm updates with PR creation
- **Python Dependencies**: pip-tools dependency updates with PR creation
- **Security Audit**: Weekly security vulnerability reports

## 🔧 Required Secrets

### Repository Secrets
Configure these in GitHub Settings → Secrets and variables → Actions:

```bash
# Railway Deployment
RAILWAY_TOKEN=your_railway_token
RAILWAY_SERVICE_ID=your_service_id

# Vercel Deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# URLs for Integration Testing
RAILWAY_BACKEND_URL=https://your-app.railway.app
VERCEL_FRONTEND_URL=https://your-app.vercel.app
```

### How to Get Secrets

#### Railway Secrets
1. **RAILWAY_TOKEN**:
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and get token
   railway login
   railway whoami --token
   ```

2. **RAILWAY_SERVICE_ID**:
   - Go to Railway dashboard
   - Select your project
   - Copy service ID from URL or settings

#### Vercel Secrets
1. **VERCEL_TOKEN**:
   - Go to Vercel Dashboard → Settings → Tokens
   - Create new token with appropriate scope

2. **VERCEL_ORG_ID & PROJECT_ID**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login and get IDs
   vercel login
   vercel ls
   ```

## 📋 Workflow Features

### Automated Testing
- **Frontend**: ESLint, TypeScript, Build validation
- **Backend**: Python linting, API startup, Endpoint testing
- **Security**: Vulnerability scanning, Dependency auditing
- **Integration**: Post-deployment health checks

### Automated Deployment
- **Railway Backend**: Automatic deployment on main branch push
- **Vercel Frontend**: Automatic deployment after backend success
- **Environment Variables**: Automatic configuration
- **Rollback**: Manual rollback capability

### Code Quality
- **Linting**: ESLint (JS/TS), flake8 (Python)
- **Formatting**: Prettier (JS/TS), black (Python)
- **Type Checking**: TypeScript validation
- **Import Sorting**: isort (Python)

### Security Features
- **Vulnerability Scanning**: Trivy, npm audit, Python safety
- **Dependency Updates**: Automated weekly updates
- **Security Reports**: Automated issue creation
- **SARIF Upload**: GitHub Security tab integration

## 🔄 Workflow Triggers

### Push Events
```yaml
on:
  push:
    branches: [ main, develop ]
```

### Pull Request Events
```yaml
on:
  pull_request:
    branches: [ main ]
    types: [opened, synchronize, reopened]
```

### Scheduled Events
```yaml
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
```

### Manual Triggers
```yaml
on:
  workflow_dispatch:  # Manual trigger from GitHub UI
```

## 🛠 Customization

### Adding New Tests
1. **Frontend Tests**: Add to `frontend-test` job in `ci-cd.yml`
2. **Backend Tests**: Add to `backend-test` job in `ci-cd.yml`
3. **Integration Tests**: Add to `integration-test` job

### Modifying Deployment
1. **Railway Config**: Update `deploy-backend` job
2. **Vercel Config**: Update `deploy-frontend` job
3. **Environment Variables**: Update secrets configuration

### Security Scanning
1. **Add Tools**: Include in `security-scan` job
2. **Custom Rules**: Configure in workflow files
3. **Report Format**: Modify output format

## 📊 Monitoring

### GitHub Actions Tab
- View workflow runs and status
- Download artifacts and logs
- Monitor deployment history

### Security Tab
- View vulnerability reports
- Track security advisories
- Monitor dependency alerts

### Issues Tab
- Automated security issue creation
- Dependency update notifications
- Build failure reports

## 🐛 Troubleshooting

### Common Issues

#### Deployment Failures
```bash
# Check secrets configuration
# Verify Railway/Vercel tokens
# Review deployment logs
```

#### Test Failures
```bash
# Check linting errors
# Verify build configuration
# Review test output
```

#### Security Scan Issues
```bash
# Update vulnerable dependencies
# Review security reports
# Check SARIF uploads
```

### Debug Steps
1. **Check Workflow Logs**: GitHub Actions tab → Select run → View logs
2. **Verify Secrets**: Settings → Secrets → Check all required secrets
3. **Test Locally**: Run same commands locally to reproduce issues
4. **Review Changes**: Compare with working commits

## 📈 Best Practices

### Branch Protection
Configure branch protection rules:
- Require PR reviews
- Require status checks
- Require up-to-date branches
- Restrict pushes to main

### Secret Management
- Use environment-specific secrets
- Rotate tokens regularly
- Limit secret scope
- Monitor secret usage

### Workflow Optimization
- Use caching for dependencies
- Parallel job execution
- Conditional job execution
- Artifact management

## 🔄 Maintenance

### Regular Tasks
- **Weekly**: Review dependency updates
- **Monthly**: Update workflow actions
- **Quarterly**: Review and rotate secrets
- **As Needed**: Update deployment configurations

### Monitoring
- Track workflow success rates
- Monitor deployment frequency
- Review security scan results
- Analyze build performance

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Railway CLI Documentation](https://docs.railway.app/develop/cli)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Security Best Practices](https://docs.github.com/en/actions/security-guides)
