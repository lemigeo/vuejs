"use strict";
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const parser = require('body-parser');
const Config = require('./config');
const Service = require('./service');
const Response = require('./response');
const Google = require('./google');

const app = express();
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/callback', async(req, res) => {
    Response.success(res, {code: req.query.code});
});

app.post('/signup', async(req, res) => {
    if(req.body.email === undefined || req.body.email === null) {
        Response.fail(res, 'email not found');
    }
    if(req.body.pw === undefined || req.body.pw === null) {
        Response.fail(res, 'password not found');
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)){
        Response.fail(res, 'invalid email address');
    }
    if(await Service.signup(req.body.email, req.body.pw)) {
        Response.success(res, null);
    }
    else {
        Response.fail(res, 'failed to signup');
    }
});

app.get('/confirm/:idx/:code', async(req, res) => {
    let userIdx = req.params.idx;
    let code = req.params.code;
    if(await Service.confirm(userIdx, code)){
        Response.success(res, null);
    }
    else {
        Response.fail(res, 'failed to confirm new account');
    }
});

app.post('/login', async(req, res) => {
    let email = req.body.email;
    let pw = req.body.pw;
    let user = await Service.login(email, pw);
    if(user !== null) {
        Response.success(res, {
            token: user.token,
            email: user.email,
            confirm: user.confirm,
        });
    }
    else {
        Response.fail(res, 'failed to login');
    }
});

app.get('/wallet', async(req, res) => {
    console.log(req.body.token);
    res.status(200).send({
        result: false
    });
});

app.post('/wallet/create', async(req, res) => {
    console.log(req.body.token);
    res.status(200).send({
        result: false
    });
});

app.get('/account/:address', async(req, res) => {
    console.log(req.body.token);
    console.log(req.params.address);
    res.status(200).send({
        result: false
    });
});

app.post('/account/transfer', async(req, res) => {
    console.log(req.body.token);
    console.log(req.body.address);
    res.status(200).send({
        result: false
    });
});

const server = app.listen(Config.server.port, async() => {
    console.log('api server running on port ' +Config.server.port);
    await Google.authorize();
});