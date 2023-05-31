const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('games/add');
});

router.post('/add', async (req, res) => {
    const { name, description } = req.body;
    const newGame = {
        name,
        description
    };
    await pool.query('INSERT INTO games set ?', [newGame]);
    req.flash('success', 'Game saved successfully');
    res.redirect('/games');
});

router.get('/', async (req, res) => {
    const games = await pool.query('SELECT * FROM games');
    console.log(games);
    res.render('games/list', { games });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM games WHERE id = ?', [id]);
    res.redirect('/games');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const game = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
    console.log(game[0]);
    res.render('games/edit', {game: game[0]});   
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const editGame = {
        name,
        description
    };
    console.log(editGame);
    await pool.query('UPDATE games SET ? WHERE id = ?', [editGame, id]);
    res.redirect('/games');
});

module.exports = router;