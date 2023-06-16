const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const database = require('./utils/database');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err);
  process.exit(1);
});

async function testing() {
  const test = await database.executeQuery('select * from test0;');
  console.log(test);
}

database.connect().then(() => {
  console.log('Connected to the database');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
