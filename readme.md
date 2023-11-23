# TypeORM In The Nest

> NestJS, TypeORM, Jest, Passport boilerplate

# How to use

## Config .env

```.env
<!-- postgreSQL 연결에 필요한 내용 -->
# app
NODE_ENV=development
PORT=5000
ADMIN_USER=...
ADMIN_PASSWORD=...
SECRET_KEY=...
DB_USERNAME=...
DB_PASSWORD=...
DB_HOST=localhost
DB_PORT=5433
DB_NAME=...

<!-- 아래는 도커 연결에 필요한 내용 -->
# db
POSTGRES_DB=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...

<!-- 반드시 도커를 사용할 필요는 없으며
AWS-RDS에서 postgreSQL 생성해서 연결해도 됨  -->
```

## Install packages

```
$ npm install
```

## run project

```
$ npm run start:dev
```
