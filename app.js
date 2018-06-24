var express = require("express");
var ejs = require("ejs");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


var motors = [
    {on : false, off : true, speed : 0},
    {on : false, off : true, speed : 0}
    ];
  
var checkOn = function (x, i){
	if(x.on===true)
	{
		// alert("Machine is already on");
	}
	else
	{
		// alert("Switching on the machine");
		x.on=true;
		x.off=false;
		x.speed=5;
	}
}

var checkOff = function (x, i){
	if(x.off===true)
	{
		// alert("Machine is already off");
	}
	else
	{
		// alert("Switching off the machine");
		x.off=true;
		x.on=false;
		x.speed=0;
	}
}

var increase = function (x, i){
	if(x.off===true)
	{
		// alert("Machine is off. Switch on the machine first!");
	}
	else
	{
		x.speed+=1;
	}
}


var decrease = function (x, i){
	if(x.off===true)
	{
		// alert("Machine is off. Switch on the machine first!");
	}
	else{
		if(x.speed>0)
		{
		x.speed-=1;
	    }   
	    else{
		x.speed=0;
	}
	}
}	

var fix = function (x, i){
		x.speed=5;
}


app.get("/", function(req, res){
   res.render("page1", {motors: motors}); 
});

app.post("/addmotor", function(req, res){
    var newMotor = {on : false, off : true, speed : 0};
    motors.push(newMotor);
    res.redirect("/");
});

app.post("/increase", function(req, res){
    console.log(req.body);
    var i = req.body.num;
    increase(motors[i], i);
    res.redirect("/");
});

app.post("/decrease", function(req, res){
    console.log(req.body);
    var i = req.body.num;
    decrease(motors[i], i);
    res.redirect("/");
});

app.post("/on", function(req, res){
    console.log(req.body);
    var i = req.body.num;
    checkOn(motors[i], i);
    res.redirect("/");
});

app.post("/off", function(req, res){
    console.log(req.body);
    var i = req.body.num;
    checkOff(motors[i], i);
    res.redirect("/");
});

app.get("/return", function(req, res){
    res.render("page1", {motors: motors});
});

app.post("/gethealth", function(req, res){
    res.redirect("/page2");
});

app.post("/fix", function(req, res){
    console.log(req.body.fixb);
     var i = req.body.numb;
     fix(motors[i], i);
    res.redirect("/page2");
});

app.get("/page2", function(req, res){
    res.render("page2", {motors: motors});
});


app.listen(3000,function(){
    console.log("server started at localhost 3000");
});