const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');
const Profile = require('./models/profile');

const app = express();


mongoose.connect('mongodb://localhost:27017/edit_info', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('profiles/home')
})

app.get('/profiles', async (req, res) => {
    const profiles = await Profile.find({});
    res.render('profiles/index', { profiles })
})

app.get('/profiles/:id', async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    console.log(profile);
    res.render('profiles/show', { profile })
});

app.get('/profiles/:id/edit', async (req, res) => {
    const profile = await Profile.findById(req.params.id);
    res.render('profiles/edit', { profile })
});

app.put('/profiles/:id', async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, { ...req.body.profile });
    res.redirect(`/profiles/${profile._id}`)
});


app.listen(3000, () => {
    console.log('serving on port 3000')
})