const Router = require('koa-router');
const User = require('./userModel');
const Chat = require('./chatModel');
const Topic = require('./topicModel');
const Message = require('./messageModel');
const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
const find = require('lodash.find');

const router = new Router({
  prefix: '/v1',
});

router.use(
  koaJwt({
    secret: process.env.JWT_SECRET,
    passthrough: true,
  }),
);

router.get('/_health', async (ctx) => {
  ctx.body = 'API UP';
});

router.get('/chats', async (ctx) => {
  const chatList = await Chat.find({});
  ctx.body = chatList;
});

router.post('/chats/:topicId', async (ctx) => {
  // If no user token not possible to create a chat
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data });

  const { topicId } = ctx.params;
  const topic = await Topic.findOne({ shortId: topicId }).populate('author');
  topic.popularity = topic.popularity + 1;
  topic.participants.push(authedUser);
  await topic.save();

  const createdChat = await Chat.create({
    subject: topic.subject,
    publiclyVisible: true,
  });
  createdChat.participants.push(authedUser);
  createdChat.participants.push(topic.author);
  authedUser.chats.push(createdChat);
  const topicAuthor = await User.findOne({
    shortId: topic.author.shortId,
  });
  if (authedUser.shortId !== topicAuthor.shortId) {
    topicAuthor.chats.push(createdChat);
    await topicAuthor.save();
  }
  await authedUser.save();
  await createdChat.save();

  const { message } = ctx.request.body;
  ctx.assert(message, 422, 'No message provided');
  const newMessage = await Message.create({
    actualMessage: message,
  });

  newMessage.author = authedUser;
  newMessage.deliveredTo.push(authedUser);
  newMessage.chat = createdChat;
  await newMessage.save();
  await Chat.update(
    { shortId: createdChat.shortId },
    { $push: { messages: newMessage } },
  );
  await User.update(
    { shortId: authedUser.shortId },
    { $push: { messages: newMessage } },
  );

  ctx.body = createdChat.listFormat();
});

router.post('/chats', async (ctx) => {
  // If no user token not possible to create a chat
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data });
  const { subject, publiclyVisible } = ctx.request.body;

  console.log('body => ', ctx.request.body);
  ctx.assert(subject, 422, 'No subject provided');
  const createdChat = await Chat.create({
    subject,
    publiclyVisible,
  });
  createdChat.participants.push(authedUser);
  authedUser.chats.push(createdChat);
  await authedUser.save();
  await createdChat.save();
  ctx.body = createdChat;
});

// creating a message via POST
router.post('/chats/:uuid/messages', async (ctx) => {
  // If no user token not possible to create a chat
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data });
  ctx.assert(authedUser, 401, 'No user found');

  const { uuid } = ctx.params;
  const foundChat = await Chat.findOne({
    shortId: uuid,
  });
  ctx.assert(foundChat, 404, 'No chat found');

  const { message } = ctx.request.body;
  ctx.assert(message, 422, 'No message provided');
  const newMessage = await Message.create({
    actualMessage: message,
  });

  newMessage.author = authedUser;
  newMessage.deliveredTo.push(authedUser);
  newMessage.chat = foundChat;
  await newMessage.save();
  await Chat.update({ shortId: uuid }, { $push: { messages: newMessage } });
  await User.update({ shortId: data }, { $push: { messages: newMessage } });

  ctx.body = foundChat;
});

router.get('/chats/recent', async (ctx) => {
  let authedUser = {};
  if (ctx.state.user) {
    const { data } = ctx.state.user;
    authedUser = await User.findOne({ shortId: data });
  }

  let foundChats;
  if (authedUser) {
    foundChats = await Topic.find({
      author: { $ne: authedUser._id },
    })
      .sort('-createdAt')
      .populate('author');
  } else {
    foundChats = await Topic.find({})
      .sort('-createdAt')
      .populate('author');
  }
  ctx.assert(foundChats, 404, 'No chats found');

  ctx.body = foundChats;
});

router.get('/chats/others', async (ctx) => {
  // If no user token not possible to get a chat list
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data });
  ctx.assert(authedUser, 404, 'Authed user found');

  const foundChats = await Topic.find({
    author: { $ne: authedUser._id },
  })
    .sort('-createdAt')
    .populate('author');

  ctx.body = foundChats;
});

router.get('/chats/available', async (ctx) => {
  let authedUser = {};
  if (ctx.state.user) {
    const { data } = ctx.state.user;
    authedUser = await User.findOne({ shortId: data });
  }

  let foundChats;
  if (authedUser) {
    foundChats = await Topic.find({
      author: { $ne: authedUser._id },
    })
      .sort('-createdAt')
      .populate('author');
  } else {
    foundChats = await Topic.find({})
      .sort('-createdAt')
      .populate('author');
  }

  ctx.assert(foundChats, 404, 'No chats found');

  ctx.body = foundChats;
});

router.get('/chats/me', async (ctx) => {
  // If no user token not possible to get a chat list
  ctx.assert(ctx.state.user, 403, 'No user set');

  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data }).populate({
    path: 'chats',
    populate: [
      {
        path: 'messages',
        model: 'Message',
        populate: {
          path: 'deliveredTo',
          model: 'User',
        },
      },
      {
        path: 'participants',
        model: 'User',
      },
    ],
  });
  ctx.assert(authedUser, 404, 'No user logged');

  const formattedChats = authedUser.chats.map((c) => {
    let newDelivered = 0;
    const messagesDelivered = c.messages.map((message) => {
      let delivered = false;
      message.deliveredTo.forEach((user) => {
        if (user.userName === authedUser.userName) {
          delivered = true;
        }
      });
      if (!delivered) newDelivered++;
    });
    const formatted = c.listFormat();
    formatted.newDelivered = newDelivered;
    for (let participant of c.participants) {
      if (participant.userName !== authedUser.userName) {
        formatted.otherUserName = participant.userName;
      }
    }
    return formatted;
  });

  ctx.body = formattedChats;
});

router.get('/topics/:uuid', async (ctx) => {
  const { uuid } = ctx.params;
  const topicFound = await Topic.findOne({ shortId: uuid }).populate('author');
  ctx.assert(topicFound, 404, 'No chat found');

  ctx.body = topicFound;
});

router.get('/chats/:uuid/messages', async (ctx) => {
  const { uuid } = ctx.params;
  const chatToCheck = await Chat.findOne({ shortId: uuid });
  let foundChat;
  let authedUser;
  if (chatToCheck.publiclyVisible || chatToCheck.participants.length < 2) {
    //chat is public
    foundChat = await Chat.findOne({ shortId: uuid })
      .populate('participants')
      .populate({
        path: 'messages',
        populate: [
          { path: 'author' },
          {
            path: 'deliveredTo',
            model: 'User',
          },
        ],
      });
    //if user is logged
    if (ctx.state.user) {
      const { data } = ctx.state.user;
      authedUser = await User.findOne({ shortId: data }).populate('chats');
      //check if is participant
      const isParticipant = foundChat.participants.filter(function(user) {
        if (user.userName === authedUser.userName) {
          return user;
        }
      });
      if (isParticipant) {
        //if part of chat push to delivered
        const savedMessages = foundChat.messages.map((m) => {
          let delivered = false;
          m.deliveredTo.forEach((user) => {
            if (user.userName === authedUser.userName) {
              delivered = true;
            }
          });
          if (!delivered) {
            m.deliveredTo.push(authedUser);
            m.save();
          }
        });
      }
    }
  } else {
    // if chat is private
    ctx.assert(ctx.state.user, 403, 'No user set');
    const { data } = ctx.state.user;
    authedUser = await User.findOne({ shortId: data }).populate('chats');
    foundChat = await Chat.findOne({ shortId: uuid })
      .populate('participants')
      .populate({
        path: 'messages',
        populate: [
          { path: 'author' },
          {
            path: 'deliveredTo',
            model: 'User',
          },
        ],
      });
    // user needs to be part of it
    const isParticipant = foundChat.participants.filter(function(user) {
      if (user.userName === authedUser.userName) {
        return user;
      }
    });
    ctx.assert(isParticipant, 401, 'Not part of chat');

    //if part of chat push to delivered
    const savedMessages = foundChat.messages.map((m) => {
      let delivered = false;
      m.deliveredTo.forEach((user) => {
        if (user.userName === authedUser.userName) {
          delivered = true;
        }
      });
      if (!delivered) {
        m.deliveredTo.push(authedUser);
        m.save();
      }
    });
  }
  ctx.assert(foundChat, 404, 'No chat found');

  const formattedParticipants = foundChat.participants.map((p) =>
    p.participantFormat(),
  );
  const formattedMessages = foundChat.messages.map((m) => m.chatFormat());
  const formattedChat = foundChat.messageFormat();
  formattedChat.messages = formattedMessages;
  formattedChat.participants = formattedParticipants;
  ctx.body = formattedChat;
});

router.post('/skills', async (ctx) => {
  const { topic1, topic2, topic3 } = ctx.request.body;

  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  authedUser = await User.findOne({ shortId: data }).populate('chats');
  authedUser.enteredTopics = true;
  authedUser.save();

  // create three skill chats (that never end)
  const firstTopic = await Topic.create({
    subject: topic1,
  });
  const secondTopic = await Topic.create({
    subject: topic2,
  });
  const thirdTopic = await Topic.create({
    subject: topic3,
  });

  firstTopic.author = authedUser;
  secondTopic.author = authedUser;
  thirdTopic.author = authedUser;

  await firstTopic.save();
  await secondTopic.save();
  await thirdTopic.save();

  ctx.body = authedUser.public();
});

router.post('/users', async (ctx) => {
  const { email, password, userName } = ctx.request.body;
  const previousUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  ctx.assert(!previousUser, 403, 'User exists');

  const createdUser = await User.create({
    email,
    password,
    userName,
  });

  ctx.body = createdUser.public();
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const userLogged = await User.auth(email, password);

  ctx.body = {
    userName: userLogged.userName,
    newPasswordRequired: userLogged.newPasswordRequired,
    enteredTopics: userLogged.enteredTopics,
    token: jwt.sign(
      {
        data: userLogged.shortId,
        expiresIn: '7d',
      },
      process.env.JWT_SECRET,
    ),
  };
});

router.get('/me', async (ctx) => {
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const userFound = await User.findOne({ shortId: data }).populate('chats');
  let newDelivered = 0;
  const formattedChats = userFound.chats.map((c) => {
    const messagesDelivered = c.messages.map((message) => {
      let delivered = false;
      message.deliveredTo.forEach((user) => {
        if (user.userName === authedUser.userName) {
          delivered = true;
        }
      });
      if (!delivered) newDelivered++;
    });
  });

  const user = userFound.public();
  user.allMessagesDelivered = newDelivered;
  ctx.body = user;
});

router.get('/users', async (ctx) => {
  const userList = await User.find({});
  const formattedUserList = userList.map((u) => u.listFormat());
  ctx.body = formattedUserList;
});

router.put('/users/update-password', async (ctx) => {
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { password: newPassword } = ctx.request.body;
  const { data } = ctx.state.user;
  const userToUpdate = await User.findOne({ shortId: data });

  userToUpdate.password = newPassword;
  userToUpdate.newPasswordRequired = false;
  await userToUpdate.save();

  ctx.body = {
    userName: userToUpdate.userName,
    newPasswordRequired: userToUpdate.newPasswordRequired,
    token: jwt.sign(
      {
        data: userToUpdate.shortId,
        expiresIn: '7d',
      },
      process.env.JWT_SECRET,
    ),
  };
});

module.exports = router;
