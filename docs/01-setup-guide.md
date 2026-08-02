# Setup Guide

## Student workflow (fork-based)
1. Fork the instructor template repo on GitHub
2. Clone your fork:
   ```bash
   git clone <your-fork-url>
   cd csp451-web-starter
   ```
3. Add upstream (instructor repo):
   ```bash
   git remote add upstream <instructor-template-url>
   git remote -v
   ```
4. Install + run:
   ```bash
   npm install
   npm run dev
   ```

## Create required branches
```bash
git checkout -b feature/user-authentication
git checkout main
git checkout -b feature/database-connection
git checkout main
git checkout -b feature/api-endpoints
```
