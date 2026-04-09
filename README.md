# Backend Engineer Technical Assessment

## Overview
This project implements a microservice-based wallet system using:

- NestJS
- gRPC
- Prisma ORM
- PostgreSQL
- Monorepo architecture

The system consists of two core microservices:
- User Service
- Wallet Service

An API Gateway is also included to expose REST endpoints.


---

## Services

### 1. User Service
Handles user management.

#### Features
- Create user
- Get user by ID

#### Fields
- id
- email
- name
- createdAt

#### gRPC Methods
- CreateUser
- GetUserById

---

### 2. Wallet Service
Handles wallet operations.

#### Features
- Create wallet
- Get wallet
- Credit wallet
- Debit wallet

#### Fields
- id
- userId
- balance
- createdAt

#### gRPC Methods
- CreateWallet
- GetWallet
- CreditWallet
- DebitWallet

---

### 3. API Gateway (Bonus)
Provides REST endpoints and communicates with microservices via gRPC.

---

## Inter-Service Communication

Wallet Service verifies user existence before creating a wallet:


---

## Database Setup

### Prerequisites
- PostgreSQL installed and running

### Configure Environment
Update your `.env` file with your database URL:
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DB_NAME

### Run Prisma Migrations
pnpm prisma:migrate:user
pnpm prisma:migrate:wallet

---

## Installation


pnpm install


---

## Running the Services

### Start User Service
pnpm run start:user-service:dev

### Start Wallet Service
pnpm run start:wallet-service::dev

### Start API Gateway
pnpm run start:dev

## API Endpoints (Gateway)

### 1. Create User
POST /user/create-user

Body:
```json
{
  "email": "test@example.com",
  "name": "John Doe"
}

2. Get User by ID
GET /user/get-user-by-id/:id

3. Create Wallet
POST /wallet/create-wallet/:userId

4. Get Wallet
GET /wallet/get-wallet/:walletId

5. Credit Wallet
POST /wallet/credit-wallet

Body:
{
  "walletId": "WALLET_ID",
  "userId": "USER_ID",
  "amount": "100"
}

6. Debit Wallet
POST /wallet/debit-wallet

Body:
{
  "walletId": "WALLET_ID",
  "userId": "USER_ID",
  "amount": "50"
}

Example cURL Requests
Create User
curl -X POST http://localhost:3000/user/create-user \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","name":"John"}'

Create Wallet
curl -X POST http://localhost:3000/wallet/create-wallet/USER_ID

Credit Wallet
curl -X POST http://localhost:3000/wallet/credit-wallet \
-H "Content-Type: application/json" \
-d '{"walletId":"WALLET_ID","userId":"USER_ID","amount":"100"}'

Debit Wallet
curl -X POST http://localhost:3000/wallet/debit-wallet \
-H "Content-Type: application/json" \
-d '{"walletId":"WALLET_ID","userId":"USER_ID","amount":"50"}'
```