import mongoose, { Schema, Model } from "mongoose";
import Admin from "../../domain/admin";

const adminSchema:Schema<Admin>=new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
});

const AdminModel: Model<Admin>=mongoose.model<Admin>('admin',adminSchema)
export {AdminModel}