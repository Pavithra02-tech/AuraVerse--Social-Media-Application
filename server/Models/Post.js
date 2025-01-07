const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    post_title :{ type : String},
    description : {type: String},
    location : { type : String},
    likes:{ type : Number, default:0},
    shares:{type :Number, default:0},
    tags: [String],
    postedDate :{ type:Date,default: Date.now()}
})


const Post= new mongoose.model('POST',PostSchema);

module.exports= Post;