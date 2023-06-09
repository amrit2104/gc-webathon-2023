const Request = require("../models/request");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const ObjectId = require("mongodb").ObjectId;
// const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const requests = await Request.find({});
  // console.log(requests);
  res.render("requests/index", { requests });
};

module.exports.renderNewForm = (req, res) => {
  res.render("requests/new");
};

module.exports.createRequest = async (req, res, next) => {
  
  // console.log(req.body);
  const request = new Request(req.body);
  // console.log(req.body);
  
  request.user = req.user._id;
  request.admin = ObjectId("6414ad771642e487baf6bad9"); // admin 641367c0a7208d00e565e4ec
  request.status = 2;
  await request.save();
  // console.log(request);
  req.flash("success", "Successfully created a new request");
  res.redirect("/userportal");
};

module.exports.replyRequest = async (req, res, next) => {
  const status = req.query.status;
  const request = await Request.findById(req.params.id);
  request.status = status;

  await request.save();
  res.redirect("/dashboard");
};

module.exports.deleteRequest = async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  req.flash("success", "Successfully deleted a request");
  res.redirect("/userportal");
};
