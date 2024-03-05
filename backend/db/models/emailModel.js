const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    email: String
});

const EmailModel = mongoose.model('Email', emailSchema);

module.exports = EmailModel;
