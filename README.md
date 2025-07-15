# udemy-microsrv-gateway

Client gateway for accessing microservices information.

## Getting Started

### Environment Variables

Copy `.env.example` to `.env` and define the required environment variables.

### Running Locally

Install dependencies and start the application:

```bash
npm install
npm run start:dev
```

### Running in a Development Container

Build and run the development container using the provided `Dockerfile`:

```bash
docker build -t udemy-microsrv-gateway-dev -f Dockerfile .
docker run -p 3000:3000 --env-file .env udemy-microsrv-gateway-dev
```

### Running in a Production Container

Build and run the production container using `Dockerfile.prod`:

```bash
docker build -t udemy-microsrv-gateway-prod -f Dockerfile.prod .
docker run -p 3000:3000 --env-file .env udemy-microsrv-gateway-prod
```
