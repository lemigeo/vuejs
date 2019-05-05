"use strict";
const fs = require('fs');
const util = require('util');
const readline = require('readline');
const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const credentialsPath = 'credentials.json';
const tokenPath = 'token.json';
const readFile = (fileName) => util.promisify(fs.readFile)(fileName, 'utf8');
const writeFile = (fileName, content) => util.promisify(fs.writeFile)(fileName, content);
const deleteFile = (fileName) => util.promisify(fs.unlink)(fileName);

let credentials, tokens, oAuth2Client;
let clientId, clientSecret, redirectUrl;
let scopes = ['https://www.googleapis.com/auth/gmail.send'];

module.exports.authorize = async () => {
    try {
        let content = await readFile(credentialsPath);
        credentials = JSON.parse(content);
        oAuth2Client = new google.auth.OAuth2(credentials.installed.client_id, credentials.installed.client_secret, credentials.installed.redirect_uris[1]);
        oAuth2Client.on('tokens', (tokens) => {
            if (tokens.refresh_token) {
                console.log('refresh token: ' + tokens.refresh_token);
            }
            console.log('access token: ' + tokens.access_token);
        });
        if (fs.existsSync(tokenPath)) {
            content = await readFile(tokenPath);
            await this.setToken(JSON.parse(content));
        }
        else {
            var authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                approval_prompt: 'force',
                scope: scopes
            });
            console.log(authUrl);
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question('Enter the code from that page here: ', async (code) => {
                rl.close();
                await oAuth2Client.getToken(code, async (err, token) => {
                    if (err) return console.error('Error retrieving access token', err);
                    await this.setToken(token);
                });
            });
        }

    }
    catch (err) {
        console.error('google auth error: ', err);
    }
};

module.exports.setToken = async (token) => {
    tokens = token;
    oAuth2Client.setCredentials(token);
    await writeFile(tokenPath, JSON.stringify(token));
};

module.exports.getToken = async(code) => {
    tokens = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(tokens);
}

module.exports.sendEmail = async(email, subject, content) => {
    // oAuth2Client.setCredentials
    // tokens = await oAuth2Client.refreshAccessToken();
    // oAuth2Client.setCredentials(tokens);
    let transport = nodemailer.createTransport({
        service: 'gmail',
        // host: 'smtp.googlemail.com',
        // port: 465,
        // secure: true,
        auth: {
            type: 'oauth2',
            user: 'lemigeo@gmail.com',
            clientId: credentials.installed.client_id,
            clientSecret: credentials.installed.client_secret,
            refreshToken: tokens.refresh_token,
            // accessToken: tokens.access_token,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: "lemigeo@gmail.com",
        to: email,
        subject: subject,
        generateTextFromHTML: true,
        html: content
    };

    transport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        // transport.close();
   });
}