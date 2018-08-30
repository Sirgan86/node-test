const express = require('express');
const hbs=require('hbs');
const fs = require('fs');


var app=express();



hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getDate();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.set('view engine','hbs');



// requesting object and response object
app.use((req,res,next)=>{

    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err)
        {
            console.log('Unable to append to server.log !');
        }
    });
    next();
})

//          MAINTEANCE PAGE.
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + 'public'));

app.get('/', (req,res) => {
    //res.send('<h1>Hello express</h1>');

    /*res.send({
        name: 'Figghiozzo',
        likes:[
            "minchie",
            "pelose"
        ]
    })*/

    res.render('home.hbs',{
        pageTitle:"home Page1",
        welcomeMessage: "this is the first page",
        currentYear: new Date().getFullYear()
    })

});



app.get('/about',(req,res) => {

    //res.send('About Page');
    res.render('about.hbs',{
        pageTitle:'About page',
        currentYear: new Date().getFullYear()
    });

});

app.get('/bad',(req,res) => {
 
    res.send({
        errorMessage:'Unable to handle request'
    });
});

// __dirname --> path del progetto

app.listen(3000,'localhost', function () {
    console.log('Server app listening on port 3000!');
  });
