const express = require("express");
const router = express.Router();
const requests = require("../controllers/requests");
const catchAsync = require("../utilities/CatchAsync");
const {isLoggedIn, validateRequest, isAdmin } = require("../middleware");
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ storage });

router.route("/")
.get(catchAsync(requests.index))
.post(isLoggedIn ,  catchAsync(requests.createRequest));
// , upload.array('image')

router.get("/new", isLoggedIn , requests.renderNewForm);

// router.route('/:id')
//       .get(catchAsync(campgrounds.showCampground))
//       .put(isLoggedIn , isAuthor , upload.array('image') , validateCampground ,catchAsync(campgrounds.updateCampground))
//       .delete((isLoggedIn , isAuthor , catchAsync(campgrounds.deleteCampground)));

// router.get('/:id/edit' , isLoggedIn , isAuthor , catchAsync(campgrounds.renderEditForm));

module.exports = router;
