import express from 'express';
import User from '../db/Models/User';

const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user.email === email) {
    }
  } catch (e) {
    res.json({ error: e });
  }
};

export { login };
