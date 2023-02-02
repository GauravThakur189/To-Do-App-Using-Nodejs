const express = require("express");
const bodyParser = require("body-parser");
//const { urlencoded } = require("body-parser");

const app =express();
var print = ["DSA","Syllabus revision","development"];
let workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

  app.get("/",(req,res)=>{
    var today = new Date();

    var options = {
        weekday : 'long',
        year : 'numeric',
        month :'long',
        day : 'numeric'
      }
    var day = today.toLocaleDateString("en-US",options);
    res.render('list',{listTitle:day,newlistItems:print});
  });
  app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"work list",newlistItems:workItems});
  });
  app.post("/work", (req,res)=>{
    let itemm = req.body.inputText;
    workItems.push(itemm);
    res.redirect("/work");
  })
  app.post("/",(req, res)=>{
    let item = req.body.inputText;
    if(req.body.list === "work"){
      workItems.push(item);
      res.redirect("/work");
    }else{
      print.push(item);
      res.redirect("/")
    }
    
     
  })

  app.listen(3000,()=>{
    console.log("app begins on port 3000");
  })
  
