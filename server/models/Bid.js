const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidSchema = new Schema({
    auction: { type: Schema.Types.ObjectId, ref: 'Auction' },
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    bidder: { type: Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    date: { type: Date, default: Date.now },
});