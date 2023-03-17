const mongoose = require("mongoose");
// const Review = require('./review');
const Schema = mongoose.Schema;
const User = require("./user");

// const ImageSchema = new Schema({
//     url: String,
//     filename: String
// });

// ImageSchema.virtual('thumbnail').get(function () {
//     return this.url.replace('/upload', '/upload/w_200,h_200');
// });

// ImageSchema.virtual('carousel_img').get(function () {
//     return this.url.replace('/upload', '/upload/ar_4:3,c_crop');
// });

const opts = { toJSON: { virtuals: true } };

const RequestSchema = new Schema(
  {
    title: String,
    startCoordinates: String,
    destCoordinates: String,
    price: Number,
    description: String,
    status: Number,//0 for rejected, 1 for accepeted, 2 for pending
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  opts
);

RequestSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>`;
});

module.exports = mongoose.model("Request", RequestSchema);
