const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    what_describes_you: String,
    in_business_since: Number,
    categories: String,
    description: String,
    website: String
})
module.exports = mongoose.model('Profile', ProfileSchema);  