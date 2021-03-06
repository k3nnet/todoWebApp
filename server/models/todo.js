var mongoose=require('mongoose');

module.exports=mongoose.model('Todo',{
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
    created:{
        type:Date
    }
});