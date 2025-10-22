//1.
// const express =require('express')
// const router =express.Router();//method

// // /user/test poora route

// router.get('/test',(req,res)=>{
//     res.send('user test route');
// })

// module.exports=router;



// //2.
// const express = require('express')
// const router = express.Router();
// const { body, validationResult } = require('express-validator');

// router.use(express.json())
// router.use(express.urlencoded({ extended: true }))

// router.get('/register', (req, res) => {
//     res.render('register')
// })

// router.post('/register',
//     body('email').trim().isEmail().isLength({min:13}),
//     body('password').trim().isLength({ min: 5 }),
//     body('username').trim().isLength({ min: 5 }),

//     (req, res) => {
//         const errors = validationResult(req);
//         console.log(errors)
//         res.send(errors)
//     })
// module.exports = router;



// //3.
// const express = require('express')
// const router = express.Router();
// const { body, validationResult } = require('express-validator');

// router.use(express.json())
// router.use(express.urlencoded({ extended: true }))

// router.get('/register', (req, res) => {
//     res.render('register')
// })

// router.post('/register',
//     body('email').trim().isEmail().isLength({min:13}),
//     body('password').trim().isLength({ min: 5 }),
//     body('username').trim().isLength({ min: 5 }),
//     (req, res) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty())
//         {
//             return res.send("Invalid data")
//         }
//         res.send(errors)
//     })
// module.exports = router;



// //4.
// const express = require('express')
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const userModel=require('../models/user.model')


// router.use(express.json())
// router.use(express.urlencoded({ extended: true }))

// router.get('/register', (req, res) => {
//     res.render('register')
// })

// router.post('/register',
//     body('email').trim().isEmail().isLength({min:13}),
//     body('password').trim().isLength({ min: 5 }),
//     body('username').trim().isLength({ min: 5 }),

//     (req, res) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()){
//             //humne yh return isiliye use kiya h ki agr error aaye to yhi se code return ho jaye aage continue na ho
//             return res.status(400).json({
//                 errors:errors.array(),
//                 message: 'Invalid data'
//             })
//         }
//         res.send(errors)
//     })
// module.exports = router;


// //5.
// const express = require('express')
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const userModel = require('../models/user.model')

// router.use(express.json())
// router.use(express.urlencoded({ extended: true }))

// router.get('/register', (req, res) => {
//     res.render('register')
// })

// router.post('/register',
//     body('email').trim().isEmail().isLength({ min: 13 }),
//     body('password').trim().isLength({ min: 5 }),
//     body('username').trim().isLength({ min: 5 }),

//   async  (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             res.status(400).json({
//                 errors: errors.array(),
//                 message: 'Invalid data'
//             })
//         }
//         const { email, username, password } = req.body;

//         const newUser= await  userModel.create({
//             email,
//             username,
//             password
//         })
//         res.json(newUser)
//     })//json format of data
// module.exports = router;



// //6.
// const express = require('express')
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const userModel = require('../models/user.model')
// const bcrypt=require('bcrypt')

// router.use(express.json())
// router.use(express.urlencoded({ extended: true }))

// router.get('/register', (req, res) => {
//     res.render('register')
// })

// router.post('/register',
//     body('email').trim().isEmail().isLength({ min: 13 }),
//     body('password').trim().isLength({ min: 3 }),
//     body('username').trim().isLength({ min: 3 }),

//   async  (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             res.status(400).json({
//                 errors: errors.array(),
//                 message: 'Invalid data'
//             })
//         }
//         const { email, username, password } = req.body;

//         const hashPassword = await bcrypt.hash(password,10)
//         const newUser= await  userModel.create({
//             email,
//             username,
//             password:hashPassword
//         })
//         res.json(newUser)
//     })


// module.exports = router;



//7.
const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 3 }),
    body('username').trim().isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }
        const { email, username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            email, username, password: hashPassword
        })
        res.json(newUser)
    })

router.get('/login', (req, res) => {
    res.render('login')
})



router.post(
    '/login',
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        const { username, password } = req.body

        const user = await userModel.findOne({
            username: username
        })

        if (!user) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }
        //agr user match ho gya to ab password match krtr becrypt hi provide krta compare so that # password or daala hua password true or false ho jaye
        const isMatch = await bcrypt.compare(password, user.password)


        if (!isMatch) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }


        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        },
            process.env.JWT_SECRET,
        )

        // res.json({
        //     token
        // })

        res.cookie('token',token)
        //phli value naam or doosri actual value of token

        res.send('Logged In')
    })




module.exports = router;

