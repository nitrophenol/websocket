const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    date: { type: Date, default: Date.now },
    bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }],
    highestBid: { type: Schema.Types.ObjectId, ref: 'Bid' },
    finalTransaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },
});

module.exports = mongoose.model('Auction', auctionSchema);