import express from 'express';
import User from '../db/Models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = (req: express.Request, res: express.Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 1800,
        });
        res.json({ token });
      } else {
        res.json({ msg: 'Invalid password' });
      }
    })
    .catch((e) => {
      res.json({ msg: 'Invalid email address' });
    });
};

const register = (req: express.Request, res: express.Response) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('tomas', salt);

  User.create({
    name: 'Tomas',
    lastName: 'Birbe',
    email: 'tomas.birbe@gmail.com',
    password: hashedPassword,
  })
    .then(() => res.json({ msg: 'User created successfully' }))
    .catch(() => res.json({ msg: `Can't create the user. Check data` }));
};

export { login, register };
