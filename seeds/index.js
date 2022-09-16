const mongoose = require('mongoose');
const prodoc = require('./prodoc');
const Profile = require('../models/profile');

mongoose.connect('mongodb://localhost:27017/edit_info', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
})

const seedDB = async () => {
    await Profile.deleteMany({})
    for (let i = 0; i < 4; i++) {
        const random1000 = Math.floor(Math.random() * 4)
        const pro = new Profile({
            what_describes_you: `${prodoc[random1000]._what_describes_you}`,
            in_business_since: `${prodoc[random1000]._in_business_since}`,
            categories: `${prodoc[random1000]._categories}`,
            description: `${prodoc[random1000]._description}`,
            website: `${prodoc[random1000]._website}`

        } )
        await pro.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})