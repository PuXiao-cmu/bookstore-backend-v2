require('dotenv').config();

const express = require('express');
const app = express();
const jwtMiddleware = require('./jwtMiddleware');
const bffRouter = require('./bffRouter');

app.use(express.json());
app.use(jwtMiddleware);
app.use('/', bffRouter);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`BFF running on port ${PORT}`));
