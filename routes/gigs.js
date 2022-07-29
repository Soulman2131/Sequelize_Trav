const express = require('express');
const { createGig, getGigs, displayGig, getSearch } = require('../controllers/gigs');
const router = express.Router();

//ROUTES
router.route('/add').post(createGig).get(displayGig);
router.route('/').get(getGigs);
router.route('/search').get(getSearch);

module.exports = router;
