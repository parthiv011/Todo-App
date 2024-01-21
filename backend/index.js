const express = require('express');
const {Todo} = require('./db');
const port = 3000;
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/user');

dotenv.config();

app.use(express.json());
app.use(cors({}));

app.get('/', (req, res) => {
    res.json({
        msg: "Hello"
    });
});

app.use('/', userRouter);

app.listen(port, () => {
    console.log(`Server is listening on : http://localhost:${port}/`);
});
