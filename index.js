const express = require('express');
const ejs = require('ejs');

const db = require('./config/mongoose');
const port = 7000;

const Todo = require('./models/dbschema');

const app = express();

app.use(express.static("./views"));
app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views','./views');

app.get('/',function(req,res){

    console.log('Homepage is rendering');
    Todo.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            title: "Home",
            task: task
        });
    }
)


});


app.post('/create-todo', function(req,res){

 Todo.create({

    description: req.body.description,
    category: req.body.category,
    date: req.body.date
    

},function(err,newtask){
    console.log('Todo Created');
    console.log('New Task',newtask);
   if(err){
       console.log('Error in creating task');
       return;
   }
   return res.redirect('/');
});

});

app.get('/delete-todo', function(req, res){
   
    var id = req.query;

    
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
    
        Todo.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('/'); 
});



app.listen(port ,function(err){

if(err){
    console.log('Error in running the server: ',port);
}

console.log('Server is running on port : ',port);

})


