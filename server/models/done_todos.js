var mongoose=require('mongoose');

module.exports=mongoose.model('DoneTodos',{
    text:String,
    currentStatus:String,
    state:String,
    runner:String,
    feedbacks:{
        type:Object
    },
    subTasks:{
        type:Object
    },
    closedDate:{
        type:Date
    }
});