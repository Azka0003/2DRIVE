// const express = require("express");
// const router = express.Router();
// const { upload } = require("../config/multer.config");
// const { supabase } = require("../config/supabase.config");

// // POST /upload
// router.post("/", upload.single("file"), (req, res) => {
//   const file = req.file;
// //   res.send(req.file);

//   if (!file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const fileName = Date.now() + "_" + file.originalname;

//   // Upload file to Supabase Storage (bucket: Azka)
//   supabase.storage
//     .from("Azka")
//     .upload(fileName, file.buffer, {
//       contentType: file.mimetype,
//     })
//     .then(({ data, error }) => {
//       if (error) {
//         return res.status(500).json({ error: error.message });
//       }

//       // Get public URL of uploaded file
//       const { data: publicUrlData } = supabase.storage
//         .from("Azka")
//         .getPublicUrl(fileName);

//       res.json({
//         message: "File uploaded successfully!",
//         url: publicUrlData.publicUrl,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

// module.exports = router;





//unique ni h
// const express = require("express");
// const router = express.Router();
// const { upload } = require("../config/multer.config");
// const { supabase } = require("../config/supabase.config");

// router.post("/", upload.single("file"), async (req, res) => {
//   const file = req.file;
//   res.send(req.file);

//   supabase.storage
//     .from("Azka")
//     .upload(file.originalname, file.buffer)
//         //, { contentType: file.mimetype,
//      upsert: false
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const { upload } = require("../config/multer.config");
// const { supabase } = require("../config/supabase.config");

// router.post("/", upload.single("file"), async (req, res) => {
//   const file = req.file;
//   res.send(req.file);

//   // Create a unique filename using timestamp + random string
// const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;

//   await supabase.storage
//     .from("Azka")
//     .upload(uniqueName, file.buffer)
//   //, { contentType: file.mimetype,
//   upsert: false
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const { upload } = require("../config/multer.config");
// const { supabase } = require("../config/supabase.config");
// const fileModel = require('../models/files.models')
// const authMiddleware = require('../middlewares/auth')

// router.post("/", authMiddleware, upload.single("file"), async (req, res) => {

//   const file = req.file;

//   const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;


//   await supabase.storage
//     .from("Azka")
//     .upload(uniqueName, file.buffer)
//   //, { contentType: file.mimetype,
//   upsert: false
// });

// const newfile = await fileModel.create({
//   path: data.path,
//   // originalname:req.file.originalname,here wrong as here is uniqueNmae
//   originalname: uniqueName,
//   // ab user kahan se laaye(yahan aata h authentication) to uske liye middleware bnayenge auth.js usme jwt ko require krenge
//   user: req.user.userId
// });





const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer.config");
const { supabase } = require("../config/supabase.config");
const fileModel = require('../models/files.models')
const authMiddleware = require('../middlewares/auth')

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;

  const { data, error } = await supabase.storage
    .from("Azka")
    .upload(uniqueName, file.buffer,
      { upsert: false });

  if (error) {
    return res.status(500).json({ message: "Upload failed in Supabase", details: error.message });
  }

  console.log(data.path)
  

  // Create MongoDB entry
  const newFile = await fileModel.create({
    path: uniqueName,
    originalname: req.file.originalname,
    user: req.user.userId
  });

  res.json(newFile)
});
module.exports = router;






// const { data, error }
// Why it matters:
// Supabase’s.upload() method returns an object like:
// {
//   data: { path: 'yourfilename.png' },
//   error: null
// }
// So you must extract data and error before using them.
//supabase mein kis naam se save hui h is actullay path



