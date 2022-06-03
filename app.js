
const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname+ "/date.js")



const app = express();

const ITEMS = ["Buy food", "Cook food", "Eat food"];

const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req, res){
    const day = date.getDate();
     
     res.render("list", {listTitle: day, newListItems:ITEMS});

});

app.post("/", function(req, res){

  const ITEM = req.body.newItem
  if (req.body.list === "Work List") {
    workItems.push(ITEM);
    res.redirect("/work")
  } else {
    ITEMS.push(ITEM);
    res.redirect("/")
  }

  
  
})

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems })
});

app.post("/work", (req, res) =>{
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
 