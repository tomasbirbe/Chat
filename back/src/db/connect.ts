import { connect } from 'mongoose';

const connectToDB = () =>
  connect(
    `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.nmg4k.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`
  );

export default connectToDB;
