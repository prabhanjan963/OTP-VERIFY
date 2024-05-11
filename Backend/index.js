import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/auth.js';
import path from 'path'

dotenv.config();
const app = express();
const PORT = 8000 || process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname,"/Frontend/dist")));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,"Frontend","dist","index.html"));
})

// routes
app.use('/api/v1/auth', routes)

// db coonection
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
  console.log('Database Connection Successfully')
}).catch((e) => {
  console.log('Error While Connecting Database',e)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});