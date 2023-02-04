const express = require('express');
const router = express.Router();
const url=require('url')
router.get('/search', (req, res) => res.render("index"))
router.post('/searchm', async (req, res) => {
  try {
    const response = await fetch('http://127.0.0.2:5001/search', {//change dns to your local dns on aapp.py terminal if required
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const json = await response.json();
    res.redirect(url.format({
      pathname: "/searchm",
      query: json
    }));
  } catch (error) {
    console.error(error);
  }
});
router.get('/searchm', async (req, res) => {
  const { cost, len, med, id, condition, rating } = req.query;
  res.render('index1', {
    cost, len, med, id, condition, rating, request: req
  })
});

router.post('/searchgen', async (req, res) => {
  try {
    const response = await fetch('http://127.0.0.2:5001/searchgen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const json = await response.json();
    res.redirect(url.format({
      pathname: "/searchgen",
      query: json
    }));
  } catch (error) {
    console.error(error);
  }
});
router.get('/searchgen', async (req, res) => {
  const { cost, len, med, id, condition, rating, side } = req.query;
  res.render('index2', {
    cost, len, med, id, condition, rating, side, request: req
  })
});


router.get('/searchs', (req, res) => res.render("index3"))

router.post('/searchstore', async (req, res) => {
  try {
    const response = await fetch('http://127.0.0.2:5001/displaystore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const json = await response.json();
    if (json["len"] > 50) {
      res.render("search_error")    }
    else {
      res.redirect(url.format({
        pathname: "/searchstore",
        query: json
      }));
    }
  } catch (error) {
    console.error(error);
  }
});

router.get('/searchstore', async (req, res) => {
  const {len,name,addr,pin,phone,hours}=req.query
  res.render("index4",{len,name,addr,pin,phone,hours})
})

module.exports = router;
