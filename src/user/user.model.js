import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "El nombre es obligotario"]
    },
    lastName: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    userName: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El contraseña es obligatorio"]
    },
    role: {
        type: String,
        enum: ["ADMIN", "CLIENT"],
        default: "CLIENT"
    },
    state: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('User', UserSchema);