# Full-stack app for gene expression in RNA sequence

Disclaimer: see pull requests and branches for continues development.

## Tech stack

### Backend

#### [FastAPI](https://fastapi.tiangolo.com/) is a super fast and convenient Python web API framework.
#### [Pandas](https://pandas.pydata.org/) - Python data analysis tool.

### Frontend

#### [React](https://react.dev/) is a very popular Node.js based UI web framework. Combined with a strongly typed language - [Typescript](https://www.typescriptlang.org/) - it is a great choice for frontend.
#### [Tailwind CSS](https://tailwindcss.com/) - a CSS framework for simpler and more convenient styling.

### Utilities
#### Backend - [flake8](https://flake8.pycqa.org/en/latest/) (linter), [black](https://black.readthedocs.io/en/stable/) (code formatter), [mypy](https://mypy-lang.org/) (type checker), [ReportLab](https://docs.reportlab.com/) (pdf generator),
#### Frontend - [eslint](https://eslint.org/) (linter), [prettier](https://prettier.io/) (code formatter), [webpack](https://webpack.js.org/) (module bundler),
#### Shared - [commitlint](https://commitlint.js.org/) for commit messages.

## Quick start
1. Make sure you have [Node.js](https://nodejs.org/en) (recommended latest LTS), [Python](https://www.python.org/) (recommended latest stable version, this project was developed on 3.12.4) and [Typescript](https://www.typescriptlang.org/) installed.
2. Clone this repo.
3. Install node packages in the `root` and `frontend`:
```bash
npm install && cd frontend && npm install
```
4. Run the build script (will build both frontend and backend simultaneously):
```bash
npm run build
```
5. Start the application:
```bash
npm start build
```
6. Manage your frontend from [localhost:3000](http://localhost:3000) and backend from [localhost:8000](http://localhost:8000).

## CLI 
Please check `package.json`, `frontend/package.json` and `backend/tasks.py` for useful commands.

## RNA Sequencing (RNA-Seq)

RNA sequencing (RNA-Seq) is a powerful technique used to analyze the quantity and sequences of RNA in a sample. It provides insights into the transcriptome, the complete set of RNA transcripts produced by the genome under specific circumstances or in a specific cell

You can import CSV file into the app with your payload

# Setup Guide

## Prerequisites

- **Node.js** v20+ (LTS)
- **Python** 3.12+
- **npm** (comes with Node.js)

## Initial Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
python -m pip install -r requirements.txt

# Or install both at once from root
cd ..
npm run build
```

### 2. Configure Environment Variables

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

**Frontend:**
```bash
cd frontend
# Create .env from env.example
cp env.example .env
# Edit .env to set REACT_APP_BASE_API_URL (default: http://localhost:8000)
```

## Development

### Start Both Servers (Recommended)

```bash
npm start
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Start Individually

**Frontend only:**
```bash
npm run start:frontend
```

**Backend only:**
```bash
npm run start:backend
```

## Common Commands

### Building

```bash
# Build both
npm run build

# Build frontend only
npm run build:frontend

# Build backend only (installs deps)
npm run build:backend
```

### Linting

```bash
# Lint both
npm run lint

# Lint frontend
npm run lint:frontend

# Lint backend
npm run lint:backend
```

### Formatting

```bash
# Format both
npm run format

# Format frontend
npm run format:frontend

# Format backend
npm run format:backend
```

### Type Checking

```bash
# Type check backend
npm run typecheck:backend
```

## Troubleshooting

### Python Commands Not Found

If you get errors like `'black' is not recognized`, make sure you've installed backend dependencies:

```bash
cd backend
python -m pip install -r requirements.txt
```

All commands now use `python -m` prefix to avoid PATH issues:
- `python -m pip` instead of `pip`
- `python -m black` instead of `black`
- `python -m flake8` instead of `flake8`
- `python -m uvicorn` instead of `uvicorn`
- `python -m mypy` instead of `mypy`

### Port Already in Use

**Frontend (3000):**
```bash
# Kill process on Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**Backend (8000):**
```bash
# Kill process on Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill process on Linux/Mac
lsof -ti:8000 | xargs kill -9
```

### Module Import Errors (Backend)

Make sure you're running commands from the correct directory:
```bash
cd backend
python -m uvicorn src.app:app --reload
```

### TypeScript Errors (Frontend)

```bash
cd frontend
npm install
npm run build
```

## Project Structure

```
gene-expression-in-rna-seq/
├── backend/
│   ├── src/
│   │   ├── app.py           # FastAPI application
│   │   ├── config.py        # Configuration management
│   │   ├── models.py        # Pydantic models
│   │   ├── schemas.py       # Response schemas
│   │   ├── routers/         # API route handlers
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Error handlers
│   │   └── utils/           # Utility functions
│   ├── requirements.txt     # Python dependencies
│   ├── pyproject.toml       # Python tool config
│   └── .env.example         # Environment template
├── frontend/
│   ├── src/
│   │   ├── api/             # API client
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Types and utilities
│   │   ├── App.tsx          # Main app component
│   │   └── index.tsx        # Entry point
│   ├── package.json         # Node dependencies
│   ├── webpack.config.mjs   # Webpack config
│   └── .env                 # Environment variables
└── package.json             # Root scripts
```

## Testing

### Backend Tests (when added)
```bash
cd backend
python -m pytest
```

### Frontend Tests (when added)
```bash
cd frontend
npm test
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Further Reading

- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Details on recent improvements
- [Backend README](./backend/README.md) - Backend-specific documentation
- [Frontend README](./frontend/README.md) - Frontend-specific documentation
