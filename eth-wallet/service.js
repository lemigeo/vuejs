const util = require('util');
const Config = require('./config');
const Repository = require('./repository');

module.exports.signup = async(email, pw) => {
    let encrypted = await this.encrypt(email, pw);
    let user = await Repository.createUser({
        email: email,
        encrypted: encrypted,
        create_dt: new Date(),
    });
    if(user !== null) {
        let code = await this.confirmCode();
        let confirm = await Repository.upsertUserConfirm({
            user_idx: user.idx,
            code: code,
            expire_dt: new Date(new Date().getTime() + (30 * 60000)),
        });
        if(confirm !== null) {
            let url = util.format('http://localhost:3000/confirm/%s/%s', user.idx, code);
            let html = util.format('<a href="%s">%s</a>', url, url);
            await this.sendEmail(email, 'Please confirm your new account', html);
            return true;
        }
        return false;
    }
    return false;
};

module.exports.confirm = async(userIdx, code) => {
    let confirm = await Repository.getUserConfirmByCode(userIdx, code);
    if(confirm != null) {
        if(confirm.expire_dt >= new Date()) {
            if(await Repository.updateUser(confirm.user_idx)) {
                return true;
            }
        }
    }
    return false;
};

module.exports.login = async(email, pw) => {
    let user = await Repository.getUser(email);
    let decrypted = await this.decrypt(user.encrypted, pw);
    if(user.email === decrypted) {
        let token = await this.getToken(user.idx);
        user.token = token;
        return user;
    }
    else {
        return null;
    }
}

const nodemailer = require("nodemailer");
module.exports.sendEmail = async(email, subject, content) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com',
        port: 465,
        secure: true,
        auth: {
            user: Config.mailer.user,
            pass: Config.mailer.pass,
        }
      });
      await transporter.sendMail({
        from: 'Wallet admin <lemigeo@gmail.com>',
        to: email,
        subject: subject,
        html: content,
        generateTextFromHTML: true,
      });
      return true;
};

const crypto = require('crypto'), format = require('biguint-format')
const algorithm = 'aes256';
module.exports.encrypt = async(text, pw) => {
    let cipher = crypto.createCipher(algorithm, pw);
    let crypted = cipher.update(text, 'utf-8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
};

module.exports.decrypt = async(text, pw) => {
    let decipher = crypto.createDecipher(algorithm, pw);
    let decrypted = decipher.update(text, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
};

module.exports.confirmCode = async() => {
    return format(crypto.randomBytes(8), 'dec').substring(0, 6);
};

const tokenPassword = 'token';
module.exports.getToken = async(idx) => {
    return new Promise(function (resolve, reject) {
        let cipher = crypto.createCipher(algorithm, tokenPassword);
        let text = idx +':' +new Date();
        let token = cipher.update(text, 'utf-8', 'base64');
        token += cipher.final('base64');
        resolve(token);
    });
}

module.exports.getUserIdx = async(token) => {
    return new Promise(function (resolve, reject) {
        let decipher = crypto.createDecipher(algorithm, tokenPassword);
        let text = decipher.update(token, 'base64', 'utf-8');
        text += decipher.final('utf-8');
        resolve(text.split(':')[0]);
    });
}