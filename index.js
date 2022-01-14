const express = require('express')

const scraper = require('./scraper')
const app = express()



app.get('/pbp', (req, res) => {
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

  const youtubeVideos = new Promise((resolve, reject) => {
    scraper
      .scrapeYoutube()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('YouTube scrape failed'))
  })

  Promise.all([mediumArticles, youtubeVideos])
    .then(data => {
      res.json(data[0])
    })
    .catch(err => res.status(500).send(err))
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
