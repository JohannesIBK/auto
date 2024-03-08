# Car rental

### Requirements (tested)
- [Node.js](https://nodejs.org/en/download/) (latest LTS release)
- [yarn 4](https://yarnpkg.com/getting-started/install)
- [Postgres 16](https://www.postgresql.org/download/)


### How to run
1. Clone the repository
2. Run `yarn` to install the dependencies
3. Create a database in Postgres
4. Run the backend server 
   ```bash
   cd backend
   $Env:DATABASE_URL="postgres://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME"
   $Env:PORT=3000
   
   yarn start:dev
   ```
5. Run the Frontend server
   ```bash
   cd frontend
   yarn dev -p 4200
    ```
   
6. Open your browser and go to `http://localhost:4200`
