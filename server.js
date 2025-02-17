require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// Connect to Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Fetch all recipes
app.get('/recipes', async (req, res) => {
    const { data, error } = await supabase.from('recipes').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Fetch ingredients for a specific recipe
app.get('/recipes/:id/ingredients', async (req, res) => {
    const recipeId = req.params.id;
    const { data, error } = await supabase
        .from('recipe_ingredients')
        .select('quant
