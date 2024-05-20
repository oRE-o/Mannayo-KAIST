const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const FileStore = require("session-file-store")(expressSession);

require('dotenv').config();

const usersRouter = require('./routes/users.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser('asdf'));

// 보안옵션
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        console.log('[REQUEST-CORS] Request from origin: ', origin);
        if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true)
        else callback(new Error('Not Allowed by CORS'));
    },
    credentials: true, // 세션 쿠키를 허용
};
app.use(cors(corsOptions));

// 세션 관련
app.use(
    expressSession({
      secret: 'asdf',
      resave: false,
      saveUninitialized: false,
      store: new FileStore(),
      cookie : {
        maxAge : 5300000,
    },
    })
  );
  
app.use('/users', usersRouter);
app.use('/static', express.static(path.join(__dirname,'public')));

app.get('/status', async (req, res) => {
    console.log(req.session.id);
    if (req.session.user) {
        res.status(200).json({ isAuthenticated: true, user: req.session.user });
        console.log('로그인 확인됨');
    } else {
        res.status(200).json({ isAuthenticated: false });
        console.log('로그인 안 된 유저임');
    }
});


app.listen(port, () => {
   console.log(`Example App Listening @ http://localhost:${ port }`);
});

