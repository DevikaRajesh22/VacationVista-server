import mongoose, { Schema, Document, Model } from "mongoose";
import Buyer from "../../domain/buyer";
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

interface BuyerDocument extends Buyer, Document {
    generateAuthToken: () => string;
}

const buyerSchema:  Schema<BuyerDocument>  = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: String
    },
    govtId: {
        type: String,
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
});

buyerSchema.methods.generateAuthToken = function (): string {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY || '', { expiresIn: "7d" });
    return token;
};

const BuyerModel: Model<BuyerDocument> = mongoose.model<BuyerDocument>('buyer', buyerSchema);

const validate = (data: any): Joi.ValidationResult<any> => {
    const schema = Joi.object({
        name: Joi.string().required().label('Name'),
        email: Joi.string().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        isBlocked: Joi.boolean().label('IsBlocked'),
        dateOfBirth: Joi.date().label('DateOfBirth'),
        phone: Joi.string().label('Phone'),
        govtId: Joi.string().label('GovtId'),
        creationTime: Joi.date().label('CreationTime')
    });
    return schema.validate(data);
};

export { BuyerModel, validate };