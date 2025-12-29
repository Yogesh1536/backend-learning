// let http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8081);

// http.get('http://jsonplaceholder.typicode.com/todos/', res => {
//   let data = '';
//   res.on('data', chunk => data += chunk);
//   res.on('end', () => console.log(data));
// });

// const http = require('http');

// Importing custom modules
// const { getCurrentDate, formatCurrency } = require('./utils');

// Create a logger instance


// Create server using http
// const server = http.createServer((req, res) => {
//   try {
//     logger.log(`Request received for ${req.url}`);

//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write(`<h1>Welcome to our app!</h1>`);
//     res.write(`<p>Current date: ${getCurrentDate()}</p>`);
//     res.write(`<p>Formatted amount: ${formatCurrency(99.99)}</p>`);
//     res.end();
//   } catch (error) {
//     logger.error(error);
//     res.writeHead(500, { 'Content-Type': 'text/plain' });
//     res.end('Internal Server Error');
//   }
// });

// ___________________________________________________________________

import express from 'express';
import Logger from "./logger.js"
import { config } from "dotenv"
import { connectDB, disconnectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from "./routes/movieRoutes.js"

config()
connectDB()

const app = express()
const logger = new Logger('App');

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movies", movieRoutes)
app.use("/auth", authRoutes)

app.get("/hello",(req, res) => {
  res.json({message: "Hello World"})
})

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  logger.log(`Server running at http://localhost:${PORT}`);
})


//handle unhandle promise rejections (eg.database connection error)

process.on("unhandledRejection", (err) => {
  logger.error("Unhandle Rejection", err)
  server.close(async () => {
    await disconnectDB();
    process.exit(1)
  })
})

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", err)
  server.close(async () => {
    await disconnectDB();
    process.exit(1)
  })
})

process.on("SIGTERM", () => {
  logger.error("SIGTERM received, shutting down gracefully")
  server.close(async () => {
    await disconnectDB();
    process.exit(1)
  })
})

