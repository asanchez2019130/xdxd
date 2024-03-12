import mongoose from 'mongoose';


const categorySchema = mongoose.Schema({
    nameCategory: {
        type: String,
        required: [true, "The name is requerid"]
    },
    state: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Category', categorySchema);