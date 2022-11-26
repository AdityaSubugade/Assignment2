const express =require("express")
const fs=require('fs');
const port=9999;
const app=express()
app.use(express.json());
app.use(express.urlencoded({extended:false}));// setting view engine
app.set("view engine",'pug')
app.set('views','./views')
app.use(express.static(__dirname + '/public'));

// app.use("",express.static('public/images'));
app.get('/',(req,res)=>{

    res.render("home")
})
app.get('/about',(req,res)=>{

    res.render("about")
})
app.get('/gallary',(req,res)=>{

    

    res.render("gallary")
})
app.get('/services',(req,res)=>{

    res.render("services")
})
app.get('/contact',(req,res)=>{

    res.render("contact")
})


app.get('/contactDtails',(req,res)=>{

    var v = fs.readFileSync('details.txt').toString().split('\n');
    console.log(v);
    res.render('contactDtails',{file:v});


})





app.post("/postdata",(req,res)=>{
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let email=req.body.email;
    let country=req.body.country;
    let subject=req.body.subject;
    var data=firstname+','+lastname+','+email+','+country+','+subject+'\n';
    if(firstname!=""&&lastname!=""&&email!=""&&country!=""&&subject!=""){
        fs.appendFile('./public/details.txt',data + "\n",(err)=>{
            if (err)throw err
        })
        res.render("contact",{successmsg:"Informatin Submitted!!",errmsg:''})
    }else{
        res.render("contact",{successmsg:"",errmsg:'Fill Complet details'})

    }
})




app.listen(port,(err)=>{

    if(err) throw err;
    else console.log(`server found ${port}`)
})