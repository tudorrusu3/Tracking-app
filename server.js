const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const fs = require('fs');

//load env vars from config
dotenv.config({ path: './config/config.env'});

//connect to database
connectDB();

//route files
const bootcamps = require('./routes/bootcamps');


const app = express();

//body parser
app.use(express.json());

// dev logging middleware
if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'));
}

// mount routers
app.use('/', bootcamps);
app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});
const PORT = process.env.PORT || 5055;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
    
//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
     console.log(`Error: ${err.message}`);
     //close server & exit process
     server.close(() => process.exit(1));
})
/*
fs.readFile('alt.kml', 'utf8', function(err, data) {
  if (err) throw err;
  fs.readFile('alt.kml', 'utf8', function(err, data) {
    if (err) throw err;
    const coordinates = data.match(/<coordinates>.*<\/coordinates>/g)[0];
    console.log('Coordonatele vechi sunt:', coordinates);
});
  const newContent = data.replace(/<coordinates>.*<\/coordinates>/g, '<coordinates>27.107122,44.456062,0</coordinates>');
  
  fs.writeFile('alt.kml', newContent, function (err) {
    if (err) throw err;
    console.log('Fisierul a fost actualizat cu succes!');
    fs.readFile('alt.kml', 'utf8', function(err, data) {
        if (err) throw err;
        const coordinates = data.match(/<coordinates>.*<\/coordinates>/g)[0];
        console.log('Coordonatele noi sunt:', coordinates);
    });
  });
});
*/
