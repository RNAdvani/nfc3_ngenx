import { IUser } from '@/types';
import mongoose from 'mongoose';
const userSchema = new  mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
});


const User = (mongoose.models?.User as mongoose.Model<IUser> )|| mongoose.model("User", userSchema);

export default User;
