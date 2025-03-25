import { mongoose, Schema } from "mongoose";
const userData = mongoose.Schema({
 _id: {type:String,required: true},
 username:{type:String,required: true},
 password:{type:String,required: true},
 createdDate: { type:String,required: true },
 userid:{type:String,require:true},
 servers:{type:Array}
});
const userDataModel = mongoose.model("userData", userData);


const channels = mongoose.Schema({
    // _id: {type:String,required: true},
    // name:{type:String,required: true},
    // createdDate: { type:String,required: true },
    // channelId:{type:Number,require:true},
    members: [{type:Array}]
})
const channelsDataModel = mongoose.model("channelData", channels);

const server = mongoose.Schema({
    _id: {type:String,required: true},
    name:{type:String,required: true},
    admin:{type:String,required: true},
    adminId:{type:String,required: true},
    createdDate: { type:String,required: true },
    serverId:{type:String,require:true},
    members: [{type:Array}]
})
const serverDataModel = mongoose.model("serverData", server);
export { userDataModel,channelsDataModel,serverDataModel };
