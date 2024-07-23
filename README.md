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
