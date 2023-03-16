const Request = require("../models/request");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
// const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const requests = await Request.find({});
  res.render("requests/index", { requests });
};

module.exports.renderNewForm = (req, res) => {
  res.render("requests/new");
};

module.exports.createRequest = async (req, res, next) => {

  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data' , 400);
  const request = new Request(req.body.request);
  // campground.images = req.files.map((f) => ({
  //   url: f.path,
  //   filename: f.filename,
  // }));
  request.user = req.user._id;
  await request.save();
  console.log(request);
  req.flash("success", "Successfully created a new request");
  res.redirect('/userportal');
};

// module.exports.showCampground = async (req, res) => {
//   const campground = await Request.findById(req.params.id)
//     .populate({
//       path: "reviews",
//       populate: {
//         path: "author",
//       },
//     })
//     .populate("author");
//   if (!campground) {
//     req.flash("error", "Cannot find that campground");
//     return res.redirect("/campgrounds");
//   }
//   res.render("campgrounds/show", { campground });
// };

// module.exports.renderEditForm = async (req, res) => {
//   const campground = await Request.findById(req.params.id);
//   if (!campground) {
//     req.flash("error", "Cannot find that campground");
//     return res.redirect("/campgrounds");
//   }
//   res.render("campgrounds/edit", { campground });
// };

// module.exports.updateCampground = async (req, res) => {
//   const { id } = req.params;
//   const campground = await Request.findByIdAndUpdate(req.params.id, {
//     ...req.body.campground,
//   });
//   const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
//   campground.images.push(...imgs);
//   await campground.save();
//   if (req.body.deleteImages) {
//     for (let imgFilename of req.body.deleteImages) {
//       await cloudinary.uploader.destroy(imgFilename);
//     }
//     await campground.updateOne({
//       $pull: { images: { filename: { $in: req.body.deleteImages } } },
//     });
//   }
//   req.flash("success", "Successfully updated a campground");
//   res.redirect(`/campgrounds/${campground._id}`);
// };

module.exports.deleteRequest = async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  req.flash("success", "Successfully deleted a request");
  res.redirect("/userportal");
};
