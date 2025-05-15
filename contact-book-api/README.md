To Install all the mandatory dependencies such as TypeScript and Prisma
$ npm init -y
$ npm install prisma typescript ts-node @types/node --save-dev
$ npm install @prisma/client

To Initialize the database configuration using sqlite
$ npx prisma init --datasource-provider sqlite

To Migrate database 
$ npx prisma migrate dev --name initialize
