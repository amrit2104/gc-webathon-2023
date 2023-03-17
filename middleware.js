const { requestSchema } = require("./errorSchema/schemas");
const ExpressError = require("./utilities/ExpressError");
const Request = require("./models/request");

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
  const request = await Request.findById(id);
  const currUser = res.locals.currentUser._id;
  // console.log(request);
  const admin = request.admin._id;
  if (currUser && currUser === admin) {
    req.flash("error", "You do  not have permission to do that!");
    return res.redirect("/dashboard");
  } else {
    next();
  }
};

