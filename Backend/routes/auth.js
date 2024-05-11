import express from 'express';
import { signup, verifyEmail } from '../controllers/auth.js';

const routes = express.Router();

routes.post('/signup', signup)
routes.post('/verifyEmail', verifyEmail)

export default routes;