# Factofly Web Application
This is the main next.js application for the Factofly app.

## Setup
- Install NVM and nodejs.
- Install Docker
- Install global packages: `npm install -g pnpm prettier rollup`
- run `cd apps\factofly-web-app`
- get a copy of the `.env` file and put it in the `factofly-web-app` directory
- run `pnpm i`
- run `docker-compose up -d`
- connect to the database with the credentials in the `.env` file
- change the firstname, lastname, and email values in the `local-setup-script.sql` file and run it against the database.
- run `pnpm dev`
- Navigate to `http://localhost:3005` in a browser

