const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema ({
    id: { type: Number, required: true},
    name : {type:String, required: true},
    email : {type:String, required:true},
    password: {type:String, required:true}
});

const ChannelModel = mongoose.model("channel", channelSchema);  // Create model from schema

module.exports = ChannelModel;