# NEST JS Micorservices With gRPC

A monorepo project with Nest JS microservices architecture consisting of two services (my-app and auth), using gRPC as the communication protocol.<br/><br/>
This project is presented for an article I wrote on <strong>Medium</strong>, providing a tutorial about implementing a centralized authentication microservice with NestJS, using gRPC and Monorepo for streamlined token verification across microservices.<br/>

### [Full article on Medium](https://medium.com/@tareksaimouah/centralized-authentication-microservice-implementing-token-verification-with-nestjs-and-grpc-81a1f771bc7e)

## Tech Stack

- Node js (16^)
- Nest JS (10^)

## Main Features

- Monorepo
- Microservices
- Shared Libraries
- gRPC (server, client)
- Swagger Docs

## How to use

- clone project

- create .env file in the root directory of the `auth` app at `apps/auth` and fill the needed environment variables:

  - DATABASE_HOST
  - DATABASE_USERNAME
  - DATABASE_PASSWORD
  - DATABASE_PORT
  - DATABASE_NAME

  - JWT_ACCESS_SECRET
  - JWT_ACCESS_EXPIRE

  - AUTH_MICROSERVICE_URL (default: localhost:5000)

  - create .env file in the root directory of the `my-app` app at `apps/mau-app` and fill the needed environment variables:

  - AUTH_MICROSERVICE_URL (default: localhost:5000)

- run:

```bash
$ pnpm install
$ pnpm run start:dev
```

- Visit http://localhost:3001/api-docs for the `auth` microservice Swagger docs and http://localhost:3000/api-docs for the `my-app` microservice Swagger docs.
