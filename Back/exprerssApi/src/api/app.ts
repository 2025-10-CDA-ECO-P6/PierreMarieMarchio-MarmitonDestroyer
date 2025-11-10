import express from "express";
import routes from "./routes";

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(express.json());
app.use('/api', routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});


export default app;
