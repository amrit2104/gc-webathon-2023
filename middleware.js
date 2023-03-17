const {requestSchema, reviewSchema } = require("./errorSchema/schemas");
const ExpressError = require("./utilities/ExpressError");
const Campground = require("./models/request");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  // console.log(req.body);
  next();
};

// module.exports.validateRequest = (req, res, next) => {
//   const { error } = requestSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(msg, 400);
//   } else {
//     next();
//   }
// };

module.exports.isAdmin = async (req, res, next) => {
  const { id } = req.params;
  // if (!id.equals(req.admin._id)) {
    if (currentUser && req.admin.equals(currentUser._id)){
    req.flash("error", "You do  not have permission to do that!");
    return res.redirect('/');
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewID } = req.params;
  const review = await Review.findById(reviewID);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do  not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
