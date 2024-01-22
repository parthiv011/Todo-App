const express = require('express');
const router = express.Router();
const {getTodos, addTodos, updateTodos, deleteTodo} = require("../controllers/todos");

router.get('/todos', getTodos);

router.post('/add-todos',addTodos );

router.put('/todos/:id', updateTodos);

router.delete('/todos/:id',deleteTodo);

module.exports = router;
