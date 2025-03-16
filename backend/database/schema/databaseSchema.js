import { mongoose, Schema } from "mongoose";
const userData = mongoose.Schema({
 _id: {type:String,required: true},
 username:{type:String,required: true},
 password:{type:String,required: true},
 createdDate: { type:String,required: true },
 userid:{type:Number,require:true}
});
const userDataModel = mongoose.model("userData", userData);
export { userDataModel };
