import { config } from '../knexfile';
import knex from 'knex';
const currentEnv: string = process.env.ENVIRONMENT || 'development';
const db = knex(config[currentEnv]);

db.raw("SELECT VERSION()").then(() => {
    console.log(`connection to db successful!`);
  });

export default db;