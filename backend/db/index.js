const mongoose = require('mongoose');
const { z } = require('zod');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected!"))

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const Todo = mongoose.model('Todos', todoSchema);

module.exports = {Todo};