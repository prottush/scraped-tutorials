const express = require('express')
const redis = require('redis');
const scraper = require('./scraper')
const app = express();
const url = require("url")
const ip = process.env.IP || '0.0.0.0';
var cors = require('cors')


const port = process.env.PORT || 8080;

app.use(cors())
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/pbp-shotchart', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .scrapeMedium(req.query.fname, req.query.lname, req.query.hard)
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

 

  Promise.all([mediumArticles])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
  
})

app.get('/pbp-shotchar2', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .scrapePBPTOT(req.query.fname, req.query.lname, req.query.hard)
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

 

  Promise.all([mediumArticles])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
  
})


app.get('/pbp-shotchar3', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .scrapePBPTOTTeam(req.query.team, req.query.type, req.query.hard,)
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

 

  Promise.all([mediumArticles])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
  
})

app.get('/pbp-turnovers', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .scrapePass(req.query.fname, req.query.lname)
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

 

  Promise.all([mediumArticles])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
  
})

app.get('/pbp-teamshot', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .scrapeTShot(req.query.team)
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

 

  Promise.all([mediumArticles])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
  
})

app.get('/pbp-teamto', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .scrapeTTo(req.query.team)
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

 

  Promise.all([mediumArticles])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
  
})

app.get('/teamPT', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .getTeamProf()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

 

  Promise.all([mediumArticles])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
  
})

app.get('/teamPTD', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .getTeamDProf()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

 

  Promise.all([mediumArticles])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
  
})


app.get('/keyCache', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .getKeyCache(req.query.key)
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

 

  Promise.all([mediumArticles])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
  
})

app.post('/pst', (req, res) => {
  res.json(req.body);
  scraper
      .postTrend(req.body)

});



app.listen(port, ip);

