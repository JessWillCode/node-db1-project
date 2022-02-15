const express = require("express");
const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/account', accountsRouter);

server.use('*', (req,res) => {
    res.status(500).json({
        message: `[${req.method}]: ${req.baseUrl} not found!`
    });
})

module.exports = server;
