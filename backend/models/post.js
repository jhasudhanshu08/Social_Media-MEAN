const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    information: [{
        name: { type: String, required: true },
        type: { type: String, required: true },
        capacity: {
            ac: Number,
            dc: Number
        },
        serialNo: { type: String, required: true },
        location: { type: String, required: true },
        manufacture: { type: String, required: true },
        model: { type: String, required: true },
        deviceType: { type: String, required: true },
        parsingVersion: { type: String, required: true },
        description: { type: String }
    }]
})

module.exports = mongoose.model("Post", postSchema);