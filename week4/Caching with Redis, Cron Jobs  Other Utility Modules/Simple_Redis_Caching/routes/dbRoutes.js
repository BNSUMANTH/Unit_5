let express = require ('express');
let dbRouter = express.Router ();
let fs = require ('fs');
const redis = require ('../configs/redis');

// add item
dbRouter.post ('/add', async (req, res) => {
  try {
    const {task} = req.body;
    let filePath = '\db.json';
    // Read existing data
    fs.readFile (filePath, 'utf8', async(readErr, data) => {
      if (readErr) {
        return res
          .status (500)
          .json ({message: 'Failed to read file', error: readErr.message});
      }

      let jsonData = [];
      try {
        jsonData = JSON.parse (data || '[]');
      } catch (parseErr) {
        return res
          .status (500)
          .json ({message: 'JSON parse error', error: parseErr.message});
      }

      const newItem = {
        task,
        id: jsonData.length > 0 ? jsonData[jsonData.length - 1].id + 1 : 1,
      };

      jsonData.push (newItem);
      await redis.del("items")
      fs.writeFile (
        filePath,
        JSON.stringify (jsonData, null, 2),
        'utf8',
        writeErr => {
          if (writeErr) {
            return res.status (500).json ({
              message: 'Failed to write file',
              error: writeErr.message,
            });
          }
          
          res.status (200).json ({message: 'New item added', newItem});
        }
      );
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});

// get all items
dbRouter.get ('/items', async (req, res) => {
  try {
    let cachedData = await redis.get ('items');
    console.log (cachedData);
    const filePath = "\db.json"
    if (!cachedData) {
      fs.readFile (filePath, 'utf-8', async (err, data) => {
        if (err) console.log(err.message);
        data = JSON.parse (data);
       await redis.set("items", JSON.stringify(data), 'EX', 40); 
        res.status (200).json ({message: 'items from database',data});
      });
    }else{
        cachedData = await JSON.parse(cachedData)
        res.status (200).json ({message: 'items from redis',data:cachedData});
    }
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});
module.exports = dbRouter;
