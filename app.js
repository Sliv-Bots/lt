var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
 
var app = express();
var jsonParser = bodyParser.json();
 
app.use(express.static(__dirname + "/public")); 
 
app.get("/adminka", function(req, res){
    res.sendFile(__dirname+"/public/auto.html")
    //res.sendFile(__dirname+"/public/admin.html")
});

app.get("/creater/apanel/admin", function(req, res){
    res.sendFile(__dirname+"/public/admin.html")
    //res.sendFile(__dirname+"/public/admin.html")
});

app.get("/", function(req, res){
    res.sendFile(__dirname+"/public/index.html")
});


// получение списка данных
app.get("/creater/apanel/api/users", function(req, res){
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});
 
app.post("/adm", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
     
    var login_ = req.body.login;
    var password_ = req.body.password;    

})

// получение отправленных данных
app.post("/creater/apanel/api/users", jsonParser, function (req, res) {
     
    if(!req.body) return res.sendStatus(400);
     
    var names_people_ = req.body.names_people;
    var nomer_name_ = req.body.nomer_name; 
    if(names_people_ == '' || nomer_name_ == '') return;
    var user = {
        names_people: names_people_, 
        nomer_name: nomer_name_
    };  
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
     
    // находим максимальный id
    var id = Math.max.apply(Math,users.map(function(o){return o.id;}))

    if(!Number.isFinite(id)){
        user.id = 1;
    }else{
        user.id = id+1;
    } 
    // добавляем пользователя в массив
    users.push(user);
    var data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("users.json", data);
    res.send(user);
});


 // удаление пользователя по id
app.delete("/creater/apanel/api/users/:id", function(req, res){
      
    var id = req.params.id;
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        var user = users.splice(index, 1)[0];
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});


// изменение пользователя
app.put("/creater/apanel/api/users", jsonParser, function(req, res){
      
    if(!req.body) return res.sendStatus(400);
     
    var userId = req.body.id;
    var names_people_ = req.body.names_people;
    var nomer_name_ = req.body.nomer_name;
     
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }

    // изменяем данные у пользователя
    if(user){
        user.nomer_name = nomer_name_;
        user.names_people = names_people_;
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});
  
// получение одного пользователя по id
app.get("/creater/apanel/api/users/:id", function(req, res){
      
    var id = req.params.id; // получаем id
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    var user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

// получение списка данных
app.get("/api/users", function(req, res){
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});
// получение отправленных данных
app.post("/api/users", jsonParser, function (req, res) {
     
    if(!req.body) return res.sendStatus(400);
     
    var names_people_ = req.body.names_people;
    var nomer_name_ = req.body.nomer_name; 
    if(names_people_ == '' || nomer_name_ == '') return;
    var user = {
        names_people: names_people_, 
        nomer_name: nomer_name_
    };  
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
     
    // находим максимальный id
    var id = Math.max.apply(Math,users.map(function(o){return o.id;}))

    if(!Number.isFinite(id)){
        user.id = 1;
    }else{
        user.id = id+1;
    } 
    // добавляем пользователя в массив
    users.push(user);
    var data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("users.json", data);
    res.send(user);
});


 // удаление пользователя по id
app.delete("/api/users/:id", function(req, res){
      
    var id = req.params.id;
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        var user = users.splice(index, 1)[0];
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});


// изменение пользователя
app.put("/api/users", jsonParser, function(req, res){
      
    if(!req.body) return res.sendStatus(400);
     
    var userId = req.body.id;
    var names_people_ = req.body.names_people;
    var nomer_name_ = req.body.nomer_name;
     
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }

    // изменяем данные у пользователя
    if(user){
        user.nomer_name = nomer_name_;
        user.names_people = names_people_;
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});
  
// получение одного пользователя по id
app.get("/api/users/:id", function(req, res){
      
    var id = req.params.id; // получаем id
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    var user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});
 
app.listen(3000, function(){
    console.log("Start server: localhost:3000");
});