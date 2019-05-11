"use strict";
const Config = require('./config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize(Config.database.schema, Config.database.username, Config.database.password, {
    host: Config.database.host,
    port: Config.database.port,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true,
    },
    timezone: Config.database.timezone,
    pool: {
        max: 5,
        min: 1,
        acquire: 3000,
        idle: 10000
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
});

const User = sequelize.define('user', {
    idx:  {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true },
    email: Sequelize.STRING(320),
    encrypted: Sequelize.STRING(45),
    create_dt: Sequelize.DATE, 
    confirm_dt: Sequelize.DATE, 
    confirm: Sequelize.BOOLEAN,
});

const UserConfirm = sequelize.define('user_confirm', {
    user_idx:  {
        type: Sequelize.BIGINT,
        primaryKey: true },
    code: Sequelize.INTEGER,
    expire_dt: Sequelize.DATE,
});

const Account = sequelize.define('account', {
    idx:  {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true },
    user_idx: Sequelize.BIGINT,
    address: Sequelize.STRING(42),
    priv_key: Sequelize.STRING(33),
    encrypted: Sequelize.STRING(64),
    create_dt: Sequelize.DATE,
});

module.exports.createUser = async(info) => {
    try{
        let result = await User.build(info).save();
        return result.dataValues;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};

module.exports.getUser = async(email) => {
    try{
        let result = await User.findOne({
            where: {
                email: email,
            }
        });
        return result.dataValues;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};

module.exports.getUserByIdx = async(idx) => {
    try{
        let result = await User.findOne({
            where: {
                idx: idx,
            }
        });
        return result.dataValues;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

const updateUserQuery = 'update user set confirm = true, confirm_dt = :now where idx = :idx and confirm = false';
module.exports.updateUser = async(idx) => {
    try {
        let values = {
            idx: idx,
            now: new Date()
        };
        await sequelize.query(updateUserQuery, {replacements: values});
        return true;
    }
    catch(err) {
        console.log(err);
        return false;
    }
};

module.exports.upsertUserConfirm = async(info) => {
    try{
        let result = await UserConfirm.upsert(info);
        return result.dataValues;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};

module.exports.getUserConfirmByCode = async(userIdx, code) => {
    try {
        let result = await UserConfirm.findOne({
            where: {
                user_idx: userIdx,
                code: code
            }
        });
        return result.dataValues;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};

module.exports.getAccounts = async(userIdx) => {
    try {
        let result = await Account.findAll({
            attributes: ['idx', 'user_idx', 'address', 'create_dt'],
            where: {
                user_idx: userIdx
              }
        });
        let accounts = [];
        for(const item of result) {
            accounts.push(item.dataValues);
        }
        return accounts;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};

module.exports.createAccount = async(info) => {
    try{
        let result = await Account.build(info).save();
        return result.dataValues;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};