const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        messages: {
            text: {
                type: String,
            }
        },
        users: [],
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },   
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Messages", messageSchema);