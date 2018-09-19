const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema ({
  title: String,
  date: Date,
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number
});

//let other files use this schema
module.exports = AlbumSchema;
