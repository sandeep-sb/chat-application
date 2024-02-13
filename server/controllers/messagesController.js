const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await messageModel.create({
            messages: {text: message},
            users: [from, to],
            sender: from
        });
        if(data){
            return res.json({msg: "Message added successfully to the datatbase"});
        }
        return res.json({msg: "Failed to add data to database"});

    } catch (error) {
        next(error);
    }
}

module.exports.getAllMessages = async (req, res, next) => {
    try {
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users: {
                $all : [from, to],
            }
        });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.messages.text,
            };
        })
        res.json(projectedMessages);

    } catch (error) {
        next(error);
    }
}