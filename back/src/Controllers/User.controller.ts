import User from '../db/Models/User';
import bcrypt from 'bcrypt';
import express from 'express';

const createUser = (req: express.Request, res: express.Response) => {
  const hashedPassword = bcrypt
    .hashSync('caterina', 8)
    .then(() => {
      User.create({
        name: 'Caterina',
        lastName: 'Banda',
        email: 'catiyanet1@gmail.com',
        password: hashedPassword,
      })
        .then(() => res.json({ msg: 'User created successfully' }))
        .catch(() => res.json({ msg: 'Error' }));
    })
    .catch((e) => console.log(e));
};

export { createUser };
