import express from 'express';

// Controllers

import { login } from '../Controllers/Auth.controller';

const authRouter = express.Router();

authRouter.get('/', () => {
  console.log('Auth router');
});

authRouter.post('/login', login);

authRouter.get('/register', () => {
  console.log('Auth router/Register');
});

export default authRouter;
