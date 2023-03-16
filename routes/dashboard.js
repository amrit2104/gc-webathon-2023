const express = require("express");
const router = express.Router();
const requests = require("../controllers/requests");
const catchAsync = require("../utilities/CatchAsync");
const {isLoggedIn, validateRequest, isAuthor } = require("../middleware");
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ storage });

router.route("/")
.get(catchAsync(requests.index));
// .post(isLoggedIn  , validateCampground ,  catchAsync(campgrounds.createCampground));
// , upload.array('image')

// router.get("/new", isLoggedIn , campgrounds.renderNewForm);

// router.route('/:id')
//       .get(catchAsync(campgrounds.showCampground))
//       .put(isLoggedIn , isAuthor , upload.array('image') , validateCampground ,catchAsync(campgrounds.updateCampground))
//       .delete((isLoggedIn , isAuthor , catchAsync(campgrounds.deleteCampground)));

// router.get('/:id/edit' , isLoggedIn , isAuthor , catchAsync(campgrounds.renderEditForm));

module.exports = router;
