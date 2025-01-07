const express= require('express');
const { default: mongoose } = require('mongoose');
const Post = require('./Models/Post');
const dotenv= require('dotenv'); //environment variables
const cors = require('cors');

dotenv.config();
const {MONGO_CONNECTION, PORTNUM} = process.env;

const app= new express();

app.use(cors());
app.use(express.json()); //to change the application into json format (middleware)


//connecting mongodb
mongoose.connect(MONGO_CONNECTION)
    .then((result)=>{
        console.log('Mongodb Connected Successfullyy.....!!!');
    })

    .catch((error)=>{
            console.log('Error connecting Mongodb... :)');
            
    })


//get post by id
app.get('/post/get/:id', async(req,res)=>{
    const {id} =req.params; //or const id=req.params.id //object de-construction
    try{
        result=await Post.findById(id).exec();
        res.status(200).json({message:'Post Found',result});
    }catch(e){
        res.status(500).json({message: e.message})
        }
    })


//get all post
app.get('/post/getall',async(req,res)=>{
    const {} = req.params;
    try{
        result=await Post.find({}).exec();
        res.status(201).json({message : 'All Post Found Successfully', result});
    }catch(e){
        res.status(500).json({message:e.message});
    }
})


//Get Post By Likes
app.get('/post/getByLikes/:likes',async(req,res)=>{
    const { likes } = req.params;
    try{
        result=await Post.find({likes : { $gte: likes }}).exec();
        res.status(201).json({message : 'Post Found Successfully By Likes', result});
    }catch(e){
        res.status(500).json({message:e.message});
    }
})


//Get Post By location
app.get('/post/getByLocation/:location',async(req,res)=>{
    const { location } = req.params;
    try{
        result=await Post.find({ location}, '_id description').exec();
        res.status(201).json({message : 'Post Found Successfully By Location', result});
    }catch(e){
        res.status(500).json({message:e.message});
    }
})


//creating post
app.post('/post/create',async(req,res)=>{
    console.log(req.body);
    const doc = req.body; 
    try{
        if(doc!=null){
            const result= await Post.create(doc);
            res.status(201).json({message:'Posted successfully',result});
        }else{
            throw new Error('Data received is null');
        }
    }catch(e){
        res.status(500).json({message:e.message});
    }
})


//updating post
app.put('/post/update',async(req,res)=>{
    const { _id , dataToBeUpdated } = req.body;
    try{
       const result = await Post.findByIdAndUpdate(_id,dataToBeUpdated,{new:true});
       res.status(200).json({message:'Post updated successfully',result});

    }catch(e){
        res.status(500).json({message:e.message});
    }
})

//title and description should not update
app.put('/post/not/updateTitleAndDescription',)

//deleting post
app.delete('/post/delete/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const result = await Post.findByIdAndDelete(id).exec();
        res.status(200).json({message:'Post deleted Successfully',result});
    }catch(e){
        res.status(500).json({message:e.message});
    }

})

//listening the port num on which the server is running
app.listen(PORTNUM,()=>{
    console.log('server is listening on the port-', PORTNUM);   
})



