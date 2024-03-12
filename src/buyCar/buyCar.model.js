import mongoose from "mongoose";

const BuySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shoppingCart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingCart',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
});

export default mongoose.model('Buy', BuySchema);