import {mongoose,Schema} from 'mongoose';
const testSch = mongoose.Schema({
    name:{type:String,required:[true,"enter ittt"]},
    something:{type:String}
})
const ttest = mongoose.model("TESTSCH",testSch);
export  {ttest};