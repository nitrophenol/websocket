const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    date: { type: Date, default: Date.now },
});