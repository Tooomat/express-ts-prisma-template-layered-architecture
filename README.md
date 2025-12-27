# Teach stack
- Language: Typescript
- ORM : Prisma
- Database : MySQL
- Validation : Zod
- HTTP Framework : Express
- Logging : Winston
- Test : Babel, Jest, dan supertest

# STEPS TO RUN LOCALLY

```
git clone https://github.com/Tooomat/node-ts-rest-api-template.git
```

install dependencies:

```
npm install
```
change .env value and db url in .env 

run prisma db migration with:

```
npx prisma migrate dev
```

# Running the app

By Default, to run the app with hot-reload simply run

```
npm run dev
```

If you want to start the build version, run it with :

```
npm run start
```

# Creating new feature 

- Create a new schema (if needed) on prisma/schema.prisma
migrate schema with command:
```
npx prisma migrate dev
```

- create model on `/model` folder 

- Create validation for that model (for create and update if any) on `/validation` folder

- Create the service layer on `/service`

- Link it into controller in `/controller`

- Create new routes file instance at `/route/public` if user dont need login or `/route/private` if user need login , for example user.route.ts

- Register the routes into public and private registry (`route/public-api-registry.route.ts` and `route/private-api-registry.route.ts`)
