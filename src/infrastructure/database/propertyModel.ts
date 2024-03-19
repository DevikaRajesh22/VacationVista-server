import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import Property from "../../domain/property";

const propertySchema: Schema<Property> = new Schema({
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    address: {
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        flat: {
            type: String
        },
        landmark: {
            type: String
        },
        pincode: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        street: {
            type: String
        }
    },
    location: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
    },
    pricing: {
        type: Number,
        required: true
    },
    basics: {
        bathroom: {
            type: Number,
            required: true
        },
        bedroom: {
            type: Number,
            required: true
        },
        beds: {
            type: Number,
            required: true
        },
        guests: {
            type: Number,
            required: true
        }
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    amenities: {
        type: [String]
    },
    status: {
        type: String
    },
    creationTime: {
        type: Date,
        default: Date.now,
    },
});

const PropertyModel = mongoose.model<Property>('property', propertySchema);
export { PropertyModel };