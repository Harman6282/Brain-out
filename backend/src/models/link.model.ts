import { Schema , model } from "mongoose";

const linkSchema = new Schema({
    hash: String,
    link:  String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

});

export const LinkModel = model("Links", linkSchema);

