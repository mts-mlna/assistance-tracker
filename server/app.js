// ----> Reden

const Express = require('express');

const App = Express();

const Cors = require('cors');

App.use(Cors());

require('dotenv').config();

const PORT = process.env.PORT || 3000;

App.use(Express.json());

const RutasLogin = require('./src/Router/Login.Router');

App.use('/api', RutasLogin);

App.listen(PORT,()=>{ 
    console.log(`🚀 http://localhost:${PORT}`);
});
