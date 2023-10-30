const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    auctions: [{ type: Schema.Types.ObjectId, ref: 'Auction' }],
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});

module.exports = mongoose.model('User', userSchema);