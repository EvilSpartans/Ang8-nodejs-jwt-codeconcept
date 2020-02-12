const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

const jwt = require('jsonwebtoken');
users = [
  {id: 1, email: 'alex@test.fr', nickname: 'tutu', password: 'test', role: 'admin' },
  {id: 2, email: 'alex2@test.fr', nickname: 'tutu2', password: 'test', role: 'user' }
];

const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

let initialJobs = data.jobs;
let addedJobs = [];
const getAllJobs = () => {
  return [...addedJobs, ...initialJobs];
}

// Normes de sécurités

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Token");
  next();
});
//

const api = express.Router();
const auth = express.Router();

// connexion

auth.post('/login', (req, res) => {

  if(req.body) {
    const email = req.body.email.toLocaleLowerCase();
    const password = req.body.password.toLocaleLowerCase();
    const index = users.findIndex(user => user.email === email);

    if (index > -1 && users[index].password === password) {
      let user = users[index];
      let token = '';

      if (user.email === 'alex@test.fr') {
            token = jwt.sign({ iss: 'http://localhost:4201', role: 'admin', email: req.body.email, nickname: user.nickname }, secret);
      }

      else {
        token = jwt.sign({ iss: 'http://localhost:4201', role: 'user', email: req.body.email, nickname: user.nickname }, secret);
      }
    res.json({ success: true, token: token });
    }

    else {
      res.statusCode(401).json({ success: false, message : 'identifiants incorrects' });
    }
  }

  else {
    res.statusCode(500).json({ success: false, message: 'données manquantes'});
  }
});
//

// inscription

auth.post('/register', (req, res) => {
  console.log(req.body);
  if (req.body) {
    const email = req.body.email.toLocaleLowerCase().trim();
    const password = req.body.password.toLocaleLowerCase().trim();
    const nickname = req.body.nickname.trim();
    users = [{id: Date.now(), email: email, nickname: nickname, password: password}, ...users];
    res.json({ success: true, users: users });
  } else {
    res.json({success : false, mesage: 'La création a échoué'});
  }
});
//

// Afficher et créer jobs

api.get('/jobs', (req, res) => {
  res.json(getAllJobs());
});

api.get('/job/:email', (req, res) => {
  const email = req.params.email;
  const jobs = getAllJobs().filter(job => job.email === email);
  res.json({ success: true, jobs: jobs })
});

const checkUserToken = (req, res, next) => {
  if (!req.header('authorization')) {
return res.status(401).json({ success: false, message: "Header d'authentification manquant"});
  }

  console.log("req.header('authorization')", req.header('authorization'));


  const authorizationHeaderParts = req.header('authorization').split(' ');
  let token = authorizationHeaderParts[1];
  console.log('token', token);
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ success: false, message: 'Token non validé'})
    }

    else {
      console.log('decodedToken', decodedToken);
      next()
    }
  });
}

api.post('/jobs', (req, res) => {
  const job = req.body;
  addedJobs = [job, ...addedJobs];
  res.json(job);
});
//

// Recherche
api.get('/search/:term/:place?', (req, res) => {
  const term = req.params.term.toLocaleLowerCase().trim();
  let place = req.params.place;
let jobs = getAllJobs().filter(j => (j.description.toLocaleLowerCase().includes(term) || j.title.toLocaleLowerCase().includes(term)));

if (place) {
  place = place.toLocaleLowerCase().trim();
  jobs = jobs.filter(j => (j.city.toLocaleLowerCase().includes(place)));
}
res.json({ success: true, jobs });
});
//

// Lien vers un job

api.get('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const job = getAllJobs().filter(j => j.id === id);
  if(job.length === 1) {
    res.json({success: true, job: job[0]});
  } else {
    res.json({success: false, message: 'pas de jobs'});
  }
})
//

app.use('/api', api);
app.use('/auth', auth);

const port = 4201;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
