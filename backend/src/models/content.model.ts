import mongoose, { model, Schema } from "mongoose";

const contentSchema = new Schema({
    title: {
        type: String,
    },
    link: {
        type: String,
    },
    tags: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Tag'
        }
    ],
    type:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

export const ContentModel = model("Content", contentSchema);