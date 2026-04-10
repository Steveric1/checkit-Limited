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
```bash
POST /user/create-user
```
Body:
```json
{
  "email": "test@example.com",
  "name": "John Doe"
}
```

2. Get User by ID
```bash
GET /user/get-user-by-id/:id
```

3. Create Wallet
```bash
POST /wallet/create-wallet/:userId
```

4. Get Wallet
```bash
GET /wallet/get-wallet/:walletId
```

5. Credit Wallet
```bash
POST /wallet/credit-wallet
```
```json
Body:
{
  "walletId": "WALLET_ID",
  "userId": "USER_ID",
  "amount": "100"
}
```

6. Debit Wallet
```bash
POST /wallet/debit-wallet
```
```json
Body:
{
  "walletId": "WALLET_ID",
  "userId": "USER_ID",
  "amount": "50"
}
```

---

# USER API

---

## 📍 Get User by ID

### Request

```bash
curl http://localhost:3000/user/get-user-by-id/:id

Response
{
  "status": "success",
  "message": "User retrieved successfully",
  "data": {
    "id": "fa0f968e-242f-46d1-9a26-c3816aceb39d",
    "email": "test2@example.com",
    "name": "John"
  }
}
```

## Create User
### Request
```bash
curl -X POST http://localhost:3000/user/create-user \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "name": "John"
}'
Response
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "id": "fa0f968e-242f-46d1-9a26-c3816aceb39d",
    "email": "test2@example.com",
    "name": "John"
  }
}
```

---

# WALLET API

---

### Get Wallet by ID
#### Request
```bash
curl http://localhost:3000/wallet/get-wallet/:id
Response
{
  "status": "success",
  "message": "Wallet retrieved successfully",
  "data": {
    "id": "105b146d-5f10-4ecb-8425-b0234141e80a",
    "userId": "fa0f968e-242f-46d1-9a26-c3816aceb39d",
    "balance": "50"
  }
}
```

### Create Wallet
#### Request
```bash
curl -X POST http://localhost:3000/wallet/create-wallet/USER_ID

Response
{
  "status": "success",
  "message": "Wallet created successfully",
  "data": {
    "id": "105b146d-5f10-4ecb-8425-b0234141e80a",
    "userId": "fa0f968e-242f-46d1-9a26-c3816aceb39d",
    "balance": "0"
  }
}
```
### Credit Wallet
#### Request
```bash
curl -X POST http://localhost:3000/wallet/credit-wallet \
-H "Content-Type: application/json" \
-d '{
  "walletId": "WALLET_ID",
  "userId": "USER_ID",
  "amount": "100"
}'
Response
{
  "status": "success",
  "message": "Wallet credited successfully",
  "data": {
    "id": "105b146d-5f10-4ecb-8425-b0234141e80a",
    "userId": "fa0f968e-242f-46d1-9a26-c3816aceb39d",
    "balance": "100"
  }
}
```

### Debit Wallet
#### Request
```bash
curl -X POST http://localhost:3000/wallet/debit-wallet \
-H "Content-Type: application/json" \
-d '{
  "walletId": "WALLET_ID",
  "userId": "USER_ID",
  "amount": "50"
}'
Response
{
  "status": "success",
  "message": "Wallet debited successfully",
  "data": {
    "id": "105b146d-5f10-4ecb-8425-b0234141e80a",
    "userId": "fa0f968e-242f-46d1-9a26-c3816aceb39d",
    "balance": "50"
  }
}
```

## VALIDATION ERRORS
### Invalid User Creation
#### Request
```bash
curl -X POST http://localhost:3000/user/create-user \
-H "Content-Type: application/json" \
-d '{
  "email": "test",
  "name": "John"
}'
Response
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": 3,
  "details": [
    {
      "field": "email",
      "errors": "email must be a valid email"
    }
  ]
}
```

### Invalid Wallet Request
#### Request
```bash
curl -X POST http://localhost:3000/wallet/credit-wallet \
-H "Content-Type: application/json" \
-d '{
  "walletId": "WALLET_ID",
  "3": "3",
  "amount": "100"
}'
Response
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": 3,
  "details": [
    {
      "field": "walletId",
      "errors": "walletId must be a valid UUID v4"
    },
    {
      "field": "userId",
      "errors": "userId must be a valid UUID v4"
    }
  ]
}
```
