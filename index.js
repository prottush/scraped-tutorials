const express = require('express')

const scraper = require('./scraper')
const app = express()
const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 8080;




app.get('/pbp-shotchart', (req, res) => {
  req.query.color1 === 'red'  // true
  req.query.color2 === 'blue' // true
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .scrapeMedium(req.query.fname, req.query.lname)
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
