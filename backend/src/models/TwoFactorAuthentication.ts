import {Schema,model,models} from 'mongoose';
const verificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email:{
        type: String,
        required: true
    },
    verificationCode: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

export default models.Verification || model('Verification', verificationSchema);
