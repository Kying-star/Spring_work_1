var express = require('express');
var bodyparser = require('body-parser');
var fs =require('fs');

var app = express();
var multer = require('multer');
  var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};
var uploadFolder = './upload/'
createFolder(uploadFolder)
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })


// app.use(bodyparser.urlencoded({extended:true}))

app.get('/home', function(req, res){ 
  var form = fs.readFileSync('./home.html',{encoding:"utf8"})
  res.send(form)
});
app.post('/upload',upload.single('logo'),function(req,res){
    res.send({'ret_code':0});
    console.dir(req.file)
    console.log("upload finish");
})





// var urlencodedparser = bodyparser.urlencoded({extended:true});
// var jsonparser = bodyparser.json()
// app.use(jsonparser)
// app.use(urlencodedparser)
// app.get('/', function(req, res){ 
//     console.dir(req.query)
//     res.send("the home is : "+ req.query.find);
// });


// app.get('/profile/:id/user/:a', function(req, res){ 
//     console.dir(req.params)
//     res.send("hello the id = "+ req.params.id);
// });

// app.get('/ab?cd', function(req, res){
//     res.end("abcd");
// })

// app.post('/', jsonparser ,function(req,res){
//     console.dir(req.body);
//     res.send(req.body.name)
// })
app.listen(8888);

console.log("Listening to port 8888");