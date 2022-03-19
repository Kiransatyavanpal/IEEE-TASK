require("dotenv").config()  
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
const path = require("path")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
//app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true
}))
app.set("view-engine","ejs")
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB connected"))
.catch(error => console.log(error));

var db = mongoose.connection;

// db.on('error',()=>console.log("Error in Connecting to Database"));
// db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
        console.log(err);
    });

    return res.render('signup_success.ejs')

})


app.get("/",(req,res)=>{
    // res.set({
    //     "Allow-access-Allow-Origin": '*'
    // })
   res.render('index.ejs');
});
let port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Listening on PORT 3000")
});


//console.log("Listening on PORT 3000");