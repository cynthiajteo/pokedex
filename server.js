// dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');

// middleware
app.use(express.static('public')); // for css
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// data
const pokemon = require('./models/pokemon');

app.get('/', (req, res) => {
    res.send(`i wanna be the very best`);
});

// index route
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { pokemon: pokemon });
});

// new route
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
});

// create route
app.post('/pokemon', (req, res) => {
    const typeFromForm = req.body.type;
    const type = typeFromForm.split(',');
    let item = {
        name: req.body.name,
        img: req.body.img,
        type: type,
        stats: {
            hp: req.body.statsHP,
            attack: req.body.statsAtt,
            defense: req.body.statsDef,
        },
    };
    pokemon.push(item);
    res.redirect('/pokemon');
});

// show route
app.get('/pokemon/:index', (req, res) => {
    const index = req.params.index;
    res.render('show.ejs', { pokemon: pokemon, item: pokemon[index] });
});

// destroy route
app.delete('/pokemon/:index', (req, res) => {
    pokemon.splice(req.params.index, 1);
    res.redirect('/pokemon');
});

// update route
app.put('/pokemon/:index', (req, res) => {
    const index = req.params.index;
    const item = pokemon[req.params.index];
    const typeFromForm = req.body.type;
    const type = typeFromForm.split(',');
    item.type = type;
    item.name = req.body.name;
    res.redirect(`/pokemon/${index}`);
});

// edit route
app.get('/pokemon/:index/edit', (req, res) => {
    res.render('edit.ejs', {
        item: pokemon[req.params.index],
        index: req.params.index,
    });
});

app.listen(port, () => {
    console.log(`gotta catch 'em all on port: `, port);
});
