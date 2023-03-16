const mongoose = require('mongoose');
// const Review = require('./review');
const Schema = mongoose.Schema;
const User = require('./user');

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

const RequestSchema = new Schema({
    title : String,
    startCoordinates: {
            type: [Number],
            required: true
        },
    destCoordinates: {
            type: [Number],
            required: true
        },
    price : Number,
    description : String,
    location : String,
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    admin : {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
}, opts);

RequestSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>`;
});

// RequestSchema.post('findOneAndDelete',async function (campground) {
//     if(campground.reviews.length){
//         await Reviews.deleteMany({ id: {$in: campground.reviews}})
//     }
// });

module.exports = mongoose.model('Request' , RequestSchema);
