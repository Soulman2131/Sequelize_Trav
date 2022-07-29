//
//On fait le chap3 avec les erreurs
// Il faut mettre LET au lieu de const sur le POST A GIG sinon les if(!budget) ne marcherait pas
// On crée également la route pour GIGS/SEARCH & on lui met le const Op

const { Gigs } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//CREATE && DISPLAY A GIG
//POST A GIG
exports.createGig = (req, res, next) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  let errors = [];
  if (!title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if (!description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!contact_email) {
    errors.push({ text: 'Please add an email' });
  }

  //Check errors
  if (errors.length > 0) {
    res.render('add', { errors, title, technologies, budget, description, contact_email });
  } else {
    if (!budget) {
      budget = 'Unkown';
    } else {
      budget = `$${budget}`;
    }
    //Remove space
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    Gigs.create({ title, technologies, budget, description, contact_email })
      .then(gig => {
        res.redirect('/gigs');
      })
      .catch(err => console.log(err));
  }
};

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
    })
    .catch(err => console.log(err));
};

//GIGS SEARCH
exports.getSearch = (req, res, next) => {
  // term est le name qui se trouve dans le HOME
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gigs.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } }, raw: true })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => res.render('error', { error: err }));
};
