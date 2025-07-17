# EO Compliance Analysis API

A FastAPI backend service for analyzing documents for compliance keywords related to Executive Orders, diversity, equity, and inclusion.

## Features

- Document analysis for PDF, Excel (.xlsx/.xls), and Word (.docx) files
- Keyword extraction and sentence matching
- Support for multiple file uploads
- RESTful API endpoints
- CORS enabled for cross-origin requests

## Keywords Analyzed

The API searches for the following keywords:
- Gender-related: gender, transgender, transmen, transwomen, lgbtq, lgbt, non-binary, etc.
- Diversity & Inclusion: dei, diversity, equity, inclusion, inclusivity, etc.
- Health & Social: gbv, pregnant people, abortion, fsw, mat, hormone, etc.
- Population-specific: key pops, key populations, dreams, etc.

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the development server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### GET /
Returns a welcome message and API information.

### POST /analyze
Analyzes uploaded files for compliance keywords.

**Request Body:**
```json
{
  "files": [
    {
      "filename": "document.pdf",
      "content": "base64_encoded_file_content"
    }
  ]
}
```

**Response:**
```json
{
  "total_matches": 10,
  "files_processed": 1,
  "keywords_found": 5,
  "results": [
    {
      "file_path": "document.pdf",
      "source_type": "page",
      "source_name": "Page 1",
      "location": "Page 1",
      "keyword": "diversity",
      "exact_sentence": "The organization promotes diversity and inclusion.",
      "partner": "document"
    }
  ]
}
```

## Supported File Types

- PDF (.pdf)
- Excel (.xlsx, .xls)
- Word Documents (.docx)

## Deployment

### Railway

The application is configured for Railway deployment with the included `railway.toml` file.

```bash
railway deploy
```

### Manual Deployment

Set the PORT environment variable and run:
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## Development

For development with auto-reload:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Dependencies

Key dependencies include:
- FastAPI - Web framework
- Uvicorn - ASGI server
- PyPDF - PDF processing
- openpyxl - Excel file processing
- python-docx - Word document processing
- pandas - Data manipulation
- pydantic - Data validation

See `requirements.txt` for the complete list of dependencies.
