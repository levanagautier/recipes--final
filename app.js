import 'dotenv/config.js';
import './config/db.config.js';
import express from 'express';
import session from 'express-session';
const app = express();
import { CONFIG } from './config/config.js';
const { HOST, PORT, DB_HOST, DB_PASSWORD, DB_NAME, SECRET_KEY } = CONFIG;
import router from './routes/index.js';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(DB_NAME, DB_HOST, DB_PASSWORD, {
    dialect: 'mysql',
    host: HOST,
});


// app.use(session({
//   name: 'session-id',
//   secret: SECRET_KEY,
//   resave: true,
//   saveUninitialized: true,
//   store: sequelize,
//   cookie: { maxAge : 180 * 60 * 1000 } // on détermine la durée de vie de la session
// }));


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use((req, res, next)=>{
//   console.log("SESSIONS_PSEUDO", req.session?.pseudo)
//   console.log("SESSIONS_ISADMIN", req.session?.isAdmin)
//   next()

// })


// app.set("views", "./views");
// app.set("view engine", "ejs");

// app.use(router);

app.listen(PORT, () => {
  console.log(`APP RUNNING ON http://${HOST}:${PORT}`);
});
