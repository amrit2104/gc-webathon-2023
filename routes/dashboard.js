const express = require("express");
const router = express.Router();
const requests = require("../controllers/requests");
const catchAsync = require("../utilities/CatchAsync");
const {isLoggedIn, validateRequest, isAdmin } = require("../middleware");
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ storage });

router.route("/")
.get(isLoggedIn, catchAsync(requests.index));


router.route('/:id')
      .get(isLoggedIn , isAdmin , catchAsync(requests.replyRequest))


module.exports = router;
