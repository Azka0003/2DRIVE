// const express=require('express');
// // const { route } = require('./user.routes');
// const router=express.Router();

// router.get('/home',(req,res)=>{
//     res.render('home')
// })

// module.exports=router


// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middlewares/auth')

// const fileModel = require('../models/files.models')

// router.get('/home', authMiddleware, async (req, res) => {
//     //  console.log(req.user)
//     const userFiles = await fileModel.find({
//         user: req.user.userId
//     })
//     console.log(userFiles)
//     res.render('home')
// })
// //upload bhi idhr hi h
// module.exports = router



// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middlewares/auth')

// const fileModel = require('../models/files.models')

// router.get('/home', authMiddleware, async (req, res) => {

//     const userFiles = await fileModel.find({
//         user: req.user.userId
//     })
//     console.log(userFiles)
//     res.render('home',{
//          files: userFiles
//     });
// })
// //upload bhi idhr hi h

// })
// module.exports = router





// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middlewares/auth')
// const fileModel = require('../models/files.models')

// const firebase = require('../config/supabase.config')

// router.get('/home', authMiddleware, async (req, res) => {

//     const userFiles = await fileModel.find({
//         user: req.user.userId
//     })
//     console.log(userFiles)
//     res.render('home',{
//          files: userFiles
//     });
// })
// //upload bhi idhr hi h

// router.get('/download/:path',authMiddleware, async(req,res) => {
// //auth to yh check kr rha h na user loggin h ki ni ab yh check krna h ki jo file vo download kr rha h vo uski h ki ni
// //console.log(req.params,req.user)
// const loggedInUserId=req.user.userId;
// const path = req.params.path;

// //query
// const file= await fileModel.findOne({
//     user: loggedInUserId,
//     path: path
// })


// if(!file)
// {
//     return res.status(401).json({
//         message:'Unauthorized'
//     })
// }

// const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
// action: 'read',
// expires: Date.now() + 60*1000
// })

// res.redirect(signedUrl[0]) 

// })
// module.exports = router

/*if file mil gyi or ab aapko use use response pr bhejna h, firebase jo hota h uspr aap file ko upload to kr dete ho lekin vo by default kisi bhi file ko access krne ni deta, to uske liye aapko signed url create krni padhti h(for small amount of time)
to ab use bnane ke liye hume config ki firebase.config file ko access krna hoga const firebase = require('../config/firebase.config)
and write const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
action: 'read',
expires: Date.now() + 60*1000 so this url will be availabe for only 1 minute
res.redirect(signedUrl[0]) signed url array return krta h to aapko uss array ka srf first parameter chahiye
})
*/







const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const fileModel = require('../models/files.models');
const { supabase } = require("../config/supabase.config");

// Home route: list user files
router.get('/home', authMiddleware, async (req, res) => {
    const userFiles = await fileModel.find({ user: req.user.userId });
    console.log(userFiles);
    res.render('home', { files: userFiles });
});

// Download route
router.get('/download/:path', authMiddleware, async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;
        const path = req.params.path;

        // Check ownership
        const file = await fileModel.findOne({
            user: loggedInUserId,
            path: path
        });

        if (!file) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Generate signed URL from Supabase
        const { data, error } = await supabase
            .storage
            .from('Azka')          // your bucket name
            .createSignedUrl(path, 60); // 60 seconds validity

        if (error || !data) {
          //  console.error("Error creating signed URL:", error);
            return res.status(500).json({ message: 'Error generating download link' });
        }

        // Redirect user to the signed URL
        res.redirect(data.signedUrl);

    } catch (err) {
       // console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;





