const express = require('express');
const router = express.Router({ mergeParams: true });
const ExpressError = require('../utilities/ExpressError');
const catchAsync = require('../utilities/CatchAsync');
const Campground = require("../models/campground");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");
const { validateReview , isLoggedIn , isReviewAuthor} = require('../middleware');

router.post('/' , isLoggedIn , validateReview ,catchAsync(reviews.createReview));

router.delete('/:reviewID' , isLoggedIn , isReviewAuthor , catchAsync(reviews.deleteReview));

module.exports = router;