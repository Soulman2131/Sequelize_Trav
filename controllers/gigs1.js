//
const { Gigs } = require('../models');

//CREATE && DISPLAY A GIG
//POST A GIG
exports.createGig = async (req, res, next) => {
  const { title, technologies, budget, description, contact_email } = req.body;

  await Gigs.create({ title, technologies, budget, description, contact_email })
    .then(gig => {
      res.redirect('/gigs');
      // res.json(gig);
    })
    .catch(err => console.log(err));
};

// ✌️Pourquoi DISPLAY GIG? parce que l'on ne peut pas utiliser POST pour le localhost, & donc on le fait passer par GET pour la faire jouer
//DISPLAY A GIG
exports.displayGig = (req, res, next) => {
  res.render('add');
};

//GIG ALL
exports.getGigs = async (req, res, next) => {
  await Gigs.findAll({ raw: true })
    /* 'gigs' ie :5000/gigs */
    .then(gigs => {
      res.render('gigs', { name: 'All Gigs', gigs });
      // res.json(gigs);
    })
    .catch(err => console.log(err));
};
