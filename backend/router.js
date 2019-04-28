const Router = require('koa-router');
const User = require('./userModel');
const Chat = require('./chatModel');
const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');

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
  // New chat, charge here!
  const { subject } = ctx.request.body;
  const createdChat = await Chat.create({
    subject,
  });
  ctx.body = createdChat;
});

router.get('/chats/:uuid/messages', (ctx) => {
  ctx.body = 'Listing chat messages';
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
  const userFound = await User.findOne({ shortId: data });

  ctx.body = userFound.public();
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
