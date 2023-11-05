const express = require('express');
const {getBootcamp,
    getBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp} = require('../controllers/bootcamps')
const router = express.Router();
const fs = require('fs');
const Bootcamp = require('../models/Bootcamp');






router
/* e bun
.get("/",async function(req,res,next) {
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps});
        
    } catch (error) {
        res.status(400).json({ success: false })
    }

})
*/
/*
.get("/", function (req, res) {
    // Obțineți datele din server (exemplu: date dintr-o bază de date)
    const data = {
      latitudine: query.lat,
      longitudine: query.lon
    };
  
    // Set the JSON content type header
    res.setHeader("Content-Type", "application/json");
  
    // Trimiteți datele către partea de frontend
    res.json(data);
  })
  */
/*.get("/", async function(req, res) {
    try {
      const sBootcamp = await Bootcamp.findOne({}).sort({ timestamp: -1 });
      
      if (!sBootcamp) {
        return res.status(400).json({ success: false });
      }
      
      return res.status(200).json({ success: true, data: sBootcamp });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  */
  .get("/", async function(req, res) {
    try {
      const sBootcamp = await Bootcamp.findOne({}).sort({ _id: -1 });
      
      if (!sBootcamp) {
        return res.status(400).json({ success: false });
      }
      
      return res.status(200).json({ success: true, data: sBootcamp });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  
  /*
  e bun
.get("/", async function(req,res) {
    try {
        const sBootcamp = await Bootcamp.findById(req.query.id);
        
        if(!sBootcamp)
        {
            return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: sBootcamp });
    } catch (error) {
         res.status(400).json({ success: false })
        
    }
})
*/
.post("/", async function (req,res)  {

    const bootcamp = await Bootcamp.create({
        id: req.query.id,
        lat: req.query.lat,
        lon: req.query.lon,
        timestamp: req.query.timestamp

    });
    
    const id = req.query.id;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const timestamp = req.query.timestamp;


    const data = {
        latitudine: req.query.lat,
        longitutidne: req.query.lon
    };
     // Set the JSON content type header
    // res.setHeader("Content-Type", "application/json");
  // Send the JSON response to the frontend
  //res.send(JSON.stringify(data));

    //console.log(lon + "**" + lat + "***");

    fs.readFile('test200.kml', 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          res.status(500).send('A apărut o eroare la citirea fișierului.');
          return;
        }
        
        const newContent = data.replace(/<coordinates>.*<\/coordinates>/g, `<coordinates>${lon},${lat},0</coordinates>`);
     // console.log(newContent);
        fs.writeFile('test200.kml', newContent, function (err) {
          if (err) {
            console.error(err);
            res.status(500).send('A apărut o eroare la scrierea fișierului.');
            return;
          }
          
          //console.log('Fișierul a fost actualizat cu succes!');
        //  res.status(200).send('Fișierul a fost actualizat cu succes!');
          res.status(201).json({
            success: true,
            data: bootcamp 
        }); 
        });
      });
      
        
    })
/*
.post("/", async function (req,res)  {
    try {

        console.log(req.query);

        const bootcamp = await Bootcamp.create({
            id: req.query.id,
            lat: req.query.lat,
            lon: req.query.lon,
            timestamp: req.query.timestamp

        });
        
        res.status(201).json({
            success: true,
            data: bootcamp 
        });  
    } catch (error) {
        res.status(400).json({ success: false })
    }
})
*/
.put("/", async function (req, res) {
    try {
        const updatedBootcamp =     await Bootcamp.findByIdAndUpdate((req.query.id),
            {
                lat: parseInt(req.query.lat),
                lon: parseInt(req.query.lon),
                timestamp: parseInt(req.query.timestamp)
              },
            { 
                new: true,
              runValidators:true  
        });

    if (!updatedBootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: updatedBootcamp });
  } catch (error) {
    res.status(400).json({ success: false, error: error, ID:  req.query.id});
  }
})
.delete("/", async function(req, res) {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.query.id);
        if(!bootcamp) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });

    } catch (error) {
        res.status(400).json({ success: false });
    }
});

module.exports = router;