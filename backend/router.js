const Router = require('koa-router');
const User = require('./userModel');
const Chat = require('./chatModel');
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

router.post('/chats', async (ctx) => {
  // If no user token not possible to create a chat
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data });

  const { subject } = ctx.request.body;
  const createdChat = await Chat.create({
    subject,
  });
  createdChat.participants.push(authedUser);
  authedUser.chats.push(createdChat);
  await authedUser.save();
  await createdChat.save();
  ctx.body = createdChat;
});

router.post('/chats/:uuid', async (ctx) => {
  // If no user token not possible to create a chat
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data });

  const { uuid } = ctx.params;
  const foundChat = await Chat.findOne({
    uuid,
  });
  ctx.assert(foundChat, 404, 'No chat found');
  foundChat.participants.push(authedUser);
  authedUser.chats.push(foundChat);
  await authedUser.save();
  await foundChat.save();
  ctx.body = foundChat;
});

router.post('/chats/:uuid/messages', async (ctx) => {
  // If no user token not possible to create a chat
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data });

  const { uuid } = ctx.params;
  const foundChat = await Chat.findOne({
    uuid,
  });
  ctx.assert(foundChat, 404, 'No chat found');

  const { message } = ctx.request.body;
  const newMessage = await Message.create({
    actualMessage: message,
  });

  newMessage.author = authedUser;
  newMessage.chat = foundChat;
  await newMessage.save();

  foundChat.messages.push(newMessage);
  authedUser.messages.push(newMessage);

  await authedUser.save();
  await foundChat.save();

  ctx.body = foundChat;
});

router.get('/chats/others', async (ctx) => {
  // If no user token not possible to get a chat list
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data });
  ctx.assert(authedUser, 404, 'Authed user found');

  const foundChats = await Chat.find({
    'participants._id': { $ne: authedUser.id },
    participants: { $size: 1 },
  })
    .sort('-createdAt')
    .populate('participants');
  ctx.assert(foundChats, 404, 'No chats found');
  ctx.body = foundChats;
});

router.get('/chats/available', async (ctx) => {
  const foundChats = await Chat.find({
    participants: { $size: 1 },
  })
    .sort('-createdAt')
    .populate('participants');
  ctx.assert(foundChats, 404, 'No chats found');
  ctx.body = foundChats;
});

router.get('/chats/me', async (ctx) => {
  // If no user token not possible to get a chat list
  ctx.assert(ctx.state.user, 403, 'No user set');

  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data }).populate('chats');
  ctx.assert(authedUser, 404, 'No user logged');

  ctx.body = authedUser.chats;
});

router.get('/chats/:uuid/messages', async (ctx) => {
  // If no user token not possible to create a chat
  ctx.assert(ctx.state.user, 403, 'No user set');
  const { data } = ctx.state.user;
  const authedUser = await User.findOne({ shortId: data });

  const { uuid } = ctx.params;
  const foundChat = await Chat.findOne({
    uuid,
  }).populate(['messages', 'participants']);
  ctx.assert(foundChat, 404, 'No chat found');

  const found = find(foundChat.participants, authedUser.toJSON());
  ctx.assert(found, 403, 'Not part of chat');

  ctx.body = foundChat;
});

router.post('/chats/:uuid/messages', (ctx) => {
  ctx.body = 'Create new chat';
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

  ctx.body = createdUser;
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const userLogged = await User.auth(email, password);

  ctx.body = {
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

  ctx.body = userFound;
});

router.post('/logout', async (ctx) => {
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

  ctx.body = createdUser;
});

router.get('/users', async (ctx) => {
  const userList = await User.find({});
  ctx.body = userList;
});

router.get('/users/:uuid', (ctx) => {
  ctx.body = 'User detail';
});

module.exports = router;
