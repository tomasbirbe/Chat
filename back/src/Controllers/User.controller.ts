import User from '../db/Models/User';
import bcrypt from 'bcryptjs';
import express from 'express';

const createUser = (req: express.Request, res: express.Response) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('caterina', salt);

  User.create({
    name: 'Caterina',
    lastName: 'Banda',
    email: 'catiyanet1@gmail.com',
    password: hashedPassword,
  })
    .then(() => res.json({ msg: 'User created successfully' }))
    .catch(() => res.json({ msg: 'Error' }));
};

export { createUser };
