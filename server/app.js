const express = require('express');
const db = require('./util/database');

const app = express();
app.use(express.json()); //application/jsn
var cors = require('cors');
app.use(cors());

const uceniciRoutes = require('./routes/ucenici');
const skolskeGodineRoutes = require('./routes/skolske-godine');
const nastavniciRoutes = require('./routes/nastavnici');
const predmetiRoutes = require('./routes/predmeti');
const odjeljenjaRoutes = require('./routes/odjeljenja');
const predmetiNastavniciRoutes = require('./routes/predmeti-nastavnici');
const ocjeneRoutes = require('./routes/ocjene');
const zakljucneOcjeneRoutes = require('./routes/zakljucne-ocjene');
const odjNastRoutes = require('./routes/odjeljenja-nastavnici');
const ucenikRazredRoutes = require('./routes/ucenik-razred');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');

//app.use(bodyParser.urlencoded()); // kad imamo forntend tj.kad formu koristimo

const errorController = require('./controllers/error');
const { authCheck } = require('./middleware/validateToken');

app.use((req, res, next) => {
  res.setHeader('Acces-Control-Allow-Origin', '*'); //allowes acces from any client
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE'); //allowes speciffic  origin to use speciffic http methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorisation'); //client can send request that holds extra authorisation data in the header and content-type of request
  next();
});

app.use('/login', loginRoutes);
app.use('/createUser', userRoutes);

app.use(authCheck);

app.use('/ucenici', uceniciRoutes);
app.use('/skolske-godine', skolskeGodineRoutes);
app.use('/nastavnici', nastavniciRoutes);
app.use('/predmeti', predmetiRoutes);
app.use('/odjeljenja', odjeljenjaRoutes);
app.use('/predmeti-nastavnici', predmetiNastavniciRoutes);
app.use('/ocjene', ocjeneRoutes);
app.use('/zakljucne-ocjene', zakljucneOcjeneRoutes);
app.use('/odjeljenja-nastavnici', odjNastRoutes);
app.use('/ucenik-razred', ucenikRazredRoutes);
app.use(errorController.get404);

app.listen(3001);
