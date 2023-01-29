//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const homeStartingContent = "Publish your passions, your way . Create a unique and beautiful blog easily. You can create a blog to inspire, to educate, or to connect with others. But blogging is not just for your readers. It’s also for yourself. There’s a lot of gratification that comes with expressing yourself in new, digital forms.";
const aboutContent = "This website is made by Shruti Vishwakarma";
const  contactContent="Contact through LinkedIn or Gmail"
const app = express();
const _=require("lodash");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//1 
const postSchema={
  title:String,
  content:String
}
//2 creating a mongoose model
const Post=mongoose.model("Post",postSchema);


app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/contact",function(req,res){
  res.render("contact",{contactCont:contactContent})
})
app.get("/about",function(req,res){
  res.render("about",{aboutCont:aboutContent})
})
app.get("/compose",function(req,res){
  res.render("compose")
  // res.redirect("/");
})

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
  });

app.post("/compose",function(req,res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  // console.log(post)
  // posts.push(post);
 
  
  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });

  //req.body comes from body parser module
})















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
