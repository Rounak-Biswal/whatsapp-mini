const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.get("/", (req,res) => {
    res.send("server is working");
})
app.listen(3000, () => {
    console.log("site is live at port : 8080");
})
/* ------------------------------------------------------------------------------------------------------------- */
main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err);
    })

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
/* ------------------------------------------------------------------------------------------------------------- */
app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    //console.log(chats);
    res.render("index.ejs", {chats});
});
/* ------------------------------------------------------------------------------------------------------------- */
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
});
/* ------------------------------------------------------------------------------------------------------------- */
app.post("/chats", (req,res) => {
    let {from,to,msg,date} = req.body;
    let newChat = new Chat({
        from: from,
        to:to,
        msg:msg,
        date: new Date()
    });
    newChat
        .save()
        .then(res => {
            console.log("chat saved")
        })
        .catch((err) => {
            console.log(err)
        })
    res.redirect("/chats");
});
/* ------------------------------------------------------------------------------------------------------------- */
app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let foundChat = await Chat.findById(id);
    //res.send("working");
    console.log(foundChat)
    res.render("edit.ejs", {foundChat});
});
/* ------------------------------------------------------------------------------------------------------------- */
app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true, new:true}
    );
    res.redirect("/chats");
});
/* ------------------------------------------------------------------------------------------------------------- */
app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})