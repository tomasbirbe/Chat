import express from 'express';

// Controllers

import { createUser } from '../Controllers/User.controller';

const userRouter = express.Router();

userRouter.post('/', createUser);

export default userRouter;
