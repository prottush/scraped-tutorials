const express = require('express')
const redis = require('redis');
const scraper = require('./scraper')
const app = express();
const url = require("url")
const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 8080;



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
  (async () => {
    const client = redis.createClient({
      url: 'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-34-231-237-66.compute-1.amazonaws.com:23880',
      socket: {
        tls: true,
        rejectUnauthorized: false
      }
    });
    
    
    
  
  
    client.on('error', (err) => console.log('Redis Client Error', err));
  
    
    await client.connect();
    
    
    let mediumArticles = null;
    const value = await client.get(fname+"_"+lname);
    if (value ) {
      mediumArticles = JSON.parse(value);
    } else {
       mediumArticles = new Promise((resolve, reject) => {
        scraper
          .scrapeMedium(req.query.fname, req.query.lname)
          .then(data => {
            resolve(data)
          })
          .catch(err => reject('Medium scrape failed'))
      })
    }
  })();
  

 

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



app.listen(port, ip);
