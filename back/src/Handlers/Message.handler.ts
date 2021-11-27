import Chat from '../db/Models/Chat';

const updateChat = (socket) => (payload) => {
  const { idChat, from, to, data, timestamp } = payload;
  if (!idChat) {
    Chat.create({
      messages: [],
    })
      .then((chat) => {
        Chat.findByIdAndUpdate(chat._id, {
          $push: { messages: { from, to, data, timestamp } },
        });
      })
      .catch((e) => console.log(e));
  } else {
    Chat.findById(idChat).then((chat) => {
      chat.messages.push({ from, to, data, timestamp });
      chat.save();
    });
  }
};

const sendChat = (socket) => (payload) => {
  console.log(payload);
  const { idChat, token } = payload;
  Chat.findById(idChat).then((chat) => {
    socket.emit(`sendChat:${token}`, chat);
  });
};

export { updateChat, sendChat };
