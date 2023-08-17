const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const { urlencoded } = require("body-parser");

const app =express();
// var print = ["DSA","Syllabus revision","development"];
// let workItems = [];
 
const Schema = mongoose.Schema;

const doListSchema = new Schema({
  name:{
    type:String,
    required:true,
  }
})
const DoListItem = mongoose.model("DoListItem",doListSchema);

const item1 = DoListItem({
  name:"DSA"
});
const item2=  DoListItem ({
  name : "Syllabus Revision"    
});
const item3 = DoListItem({
  name:"development"
})
  //saving the data in database

const defaultitems = [item1,item2,item3];


// const List = mongoose.model('List',listSchema);
  


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



  app.get("/",(req,res)=>{
    DoListItem.find()
.then((item)=>{
  if(item.length===0){
    DoListItem.insertMany(defaultitems)
.then(()=>{
  console.log("Data inserted");
})
.catch((err)=>{
   console.log("error"+err);
})
res.redirect("/");
  }
  else{
  console.log(item);
  res.render('list',{listTitle:"Today",newlistItems:item});
  }
})
.catch((err)=>{
  console.log("errorr"+err);
})
  });
 
  // app.get("/:customListName",(req,rs)=>{
  //   const customList= req.params.customListName;
  //   const list = new List({
  //     name:customList,
  //     items:[defaultitems]
  //   })

  app.post("/",(req, res)=>{
    let itemName = req.body.inputText;
    const item  = new DoListItem({
      name:itemName 
    })
    item.save(); 
    res.redirect("/"); 
  })

  app.post("/delete",(req,res)=>{
    const dataId=req.body.checkbox;
     DoListItem.findByIdAndRemove(dataId)
     .then(()=>{
      console.log("deleted");
     })
     .catch((err)=>{
      console.log("not deleted"+err);
     })
     res.redirect("/");
  })

  

  mongoose.connect("mongodb+srv://thakurshahab1809:AFwCKOOj1won4eI5@cluster0.ikkebsi.mongodb.net/toDoList?retryWrites=true&w=majority")
  .then(()=>{
    console.log("connected to mongoose");
    app.listen(3000);
    
  })
  .catch((err)=>{
    console.log("error in connection to mongoose"+err);
  })
  
