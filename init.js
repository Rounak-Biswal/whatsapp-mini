const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

let allChats = [
    {
        from:"Denis",
        msg:"Hey man! How you doin'?",
        to:"Rounak",
        date:new Date()
    },{
        from:"Chritopher",
        msg:"I'm tired, let CG this part",
        to:"Nolan",
        date:new Date()
    },{
        from:"Raghav",
        msg:"Uh...will u go out with me ??",
        to:"Vanshika",
        date:new Date()
    }
]

Chat.insertMany(allChats);