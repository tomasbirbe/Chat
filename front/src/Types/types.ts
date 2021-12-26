interface user {
  name: string;
  lastName: string;
  email: string;
  _id: string;
}

interface message {
  _id: string;
  from: user;
  to?: string;
  data: string;
  timestamp: number;
}

interface chat {
  _id: string;
  participants: user[];
  messages: message[];
}

interface contact {
  _id?: string;
  idContact?: string;
  alias: string;
  email: string;
}

export type { user, message, chat, contact };
