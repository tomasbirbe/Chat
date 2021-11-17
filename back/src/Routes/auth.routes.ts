import express from 'express';

// Controllers

import { login, register } from '../Controllers/Auth.controller';

const authRouter = express.Router();

authRouter.get('/', () => {
  console.log('Auth router');
});

authRouter.post('/login', login);

authRouter.post('/register', register);

export default authRouter;
