# Luminal Agent API Controller

Production-ready Node.js backend for the Luminal Agent AI platform.

## 🚀 Stack
- **Runtime**: Node.js (TypeScript)
- **Framework**: Express.js
- **ORM**: Prisma (PostgreSQL)
- **Security**: JWT (Access + Refresh Rotation), Helmet, BCrypt
- **Validation**: Zod
- **Infrastructure**: Docker & Docker Compose

## 🛠️ Local Setup

1. **Clone & Navigate**:
   ```bash
   cd backend
   ```

2. **Environment**:
   ```bash
   cp .env.example .env
   # Update DATABASE_URL and JWT secrets
   ```

3. **Start Infrastructure**:
   ```bash
   docker-compose up -d
   ```

4. **Initialize Database**:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Get access & refresh tokens
- `POST /api/auth/refresh` - Swap refresh token for new pair
- `POST /api/auth/logout` - Invalidate refresh session

### Jobs (Protected)
- `GET /api/jobs` - List current user's jobs
- `POST /api/jobs` - Create a new job entry
- `GET /api/jobs/:id` - Get specific job details
- `PUT /api/jobs/:id` - Update job status/details (partial)
- `DELETE /api/jobs/:id` - Remove job entry

## 🧪 Testing
```bash
npm run test
```

## ☁️ Deployment
This project is containerized and ready for **Google Cloud Run**.
1. Build image: `docker build -t gcr.io/[PROJECT_ID]/luminal-api .`
2. Push: `docker push gcr.io/[PROJECT_ID]/luminal-api`
3. Deploy: `gcloud run deploy luminal-api --image gcr.io/[PROJECT_ID]/luminal-api`
