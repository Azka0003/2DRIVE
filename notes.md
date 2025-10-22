first go to in directory 2DRive so do cd 2DRIVE
npm init -y
npm i express ejs


npx nodemon mujhe jra badi commanbd lgti h to mein package,json mein jakr script mein add krdenge yh "start":"npx nodemon app.js"

now npm start is working same as npx nodemon app.js

we r making drive for that we need user account etc how many files he uploaded etc ofc hum crud oprtaion use krenge but authentication also required

jwt
sb kuch ek hi file mein over ho jayega
we can put routes etc in  other files 

routes naam ka folder bnaya
user.routes.js file

ab hum udhr se route ko app file mein layenge phle require krnge 

const userRouter = require('./routes/user.routes')
uske baad use krenge
app.use('/can_give_any_name',userRouter)
to aise poora route bnega yh or fr vo user route file waal route : 
/can_give_any_name/test 

basic undertsanding like how to make routes or get part in other file and access in main file


ok include tailwind go to tailwind->get started->play cdn-> add the play cdn.... ko copy kro or add krdo html file ke head section mein

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
  </body>
</html>
till here tailwind flobite sb set up ho gye

now i want to include the form and the component of form easily available in flowbite only u have to search input then we want input field
they r automatically resoonsive and also we can choose dark light theme etc

copy the code
and paste but we want some fields so take on that code baqi cut etc krdo

code dark themee mein ajeeb dikh rha h so we adding some tailwind css
<body class="bg-gray-100 dark:bg-gray-800 h-screen w-screen flex items-center justify-center">
etc

form wagera bnaya data liya post se
2.
router.post('/register',(req,res)=>{
    console.log(req.body)
    res.send('User Registred')
})
now we use express validator to valifate form data  npm i express-validator
const { query } = require('express-validator'); ise copy kiya pr hum body se khelenge so replace query

a@a.com
agr hum empty check kr rhe hain or
email entered by user is `     `something yh bhi to empty mein count ho jayega so we trim start or end length

we use middleware
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 5}),
    body('username').trim().isLength({min: 5}),

now we check or validate that data is correct or not    
    const errors = validationResult(req);
        console.log(errors)
        res.send(errors)   


3.
      (req, res) => {

        const errors = validationResult(req);

        if(!errors.isEmpty())
        {
            return res.send("Invalid data")
        }
        res.send(errors)
    }   

    not a  correct way of passing error

4.    
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            //humne yh return isiliye use kiya h ki agr error aaye to yhi se code return ho jaye aage continue na ho
            return res.status(400).json({
                errors:errors.array(),
                message: 'Invalid data'
            })
        }
        res.send(errors)
    }
    this is the right way of passing error


    ab hum db se connect krenge to create user
    lekin that way mongoose.connect is not a way for production

    we learn new way
    we dont write url directly we create environment var

    hum ek file bnayenge .env (we write all secrets here ofc mongo connection is also a secret )
write this in env file
MONGO_URI=mongodb://0.0.0.0/men-drive

now to use this var in ur applocation u need to do some setup
before setup need to install a package
npm i dotenv
now to do setup go to on file app.js
const dotenv=require('dotenv')
dotenv.config()

ab aap mongoURl ko use kr skte ho
db file
function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
} like this in ur db file

point we never put this file on github only when deploy tb
.env and nodemodules yh ni jati 

config folde k aname kuch bhi ho skta h but
Haan, generally .env hi hoti hai — ye default name hai aur sab projects mein yehi convention follow hota hai ✅
(If you use a different name, you must specify it like this:
require('dotenv').config({ path: './myenvfile' }))


khair ab user.model.js mein schema bna lenge or user.routes mein access krenge

see 5.
but prblem is passowrd kbhi bhi plain text form mein ni rehta db mein ques h q ni rehta or to fr kis form mein rehta h?
 bychnace agr in future db compromise ho gya 
 to jisne bhi kiya uske pass username plain password sb chla gya to mtlb koi bhi aapke account ka access le skta h uss application pr jo ki shi ni h isse bachnne ke liye hum passowrd ko # form mein rakhte hain how with the help of bcrypt(a package)

 istall one more package: npm i bcrypt
 ab require krlo apne user.routes mein

 accha humne men db already create kiya hua h to delete kr rhi abhi use error aayegi wrna baad mein dekheneg ise kaise bachayenge part of error handling

6. const hashPassword = await bcrypt.hash(password,10)
//hshing rounds ek balance num likh dete hain 100 likh dia jyada hi rounds ho gye or jyada hi secure ho gya,10 baar hash krdo enough h
to ab aapko password # form mein dikhrha hoga 

till now register page done
ab login page bnayeneg

7.
// username or password is incorrect why r u writing this why not clearly writing
// username not found etc qki agr aisalikhenge to hacker smjh jayega yh name h fr isse guess for password aasaan ho jayega
// agr (username or password is incorrect) ais arakhenge to use pta hi ni vhalega konsa name to passsword tk pahuchna bhi mushqil h

to agr yh login shi ho jata h user ka to ab hum generate krenge token or for token we have to install a pavkage that is
npm i jsonwebtoken

require kenege
const jwt= require('jsonwebtoken');
now generate token but why
qki user login ek baar krta h fr aage ki kaam ke liye authorized rehta h ab user login h ki ni yh pta krte hain token se


first parameter yh object second hota h secret key and as we know all secrets in .env file 
    const token=jwt.sign({
    userId:user._id,
    email: user.email,
    username:user.username
},
process.env.JWT_SECRET
)

ab hume token mil gya ab iss token ko hum  frontend pr bhejnege


const token = jwt.sign({
    userId: user._id,
    email: user.email,
    username: user.username
},
    process.env.JWT_SECRET,
)

res.json({
    token
}) 
abhi aise dekha h
o/p: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGVjMDUyMDM1YjZiYTY4NzA3YTE2MmEiLCJlbWFpbCI6ImF6a2FhYmR1bGxhaDA5OEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFyc2hpIiwiaWF0IjoxNzYwMjk4MjkyfQ.gWdooCk_7-Vj1YdWcZAkvb8vSm4mBplnfKIWofvPAV8"
} aisa h 
hume ise aise use ni krte hum ise cookies mein save krte hain

cookies one work is to save token data
ab cookies ke liye bhi ek or package lagega npm i cookie-parser
fr whi require kro
app.js mein

const cookieparser=require('cookie-parser')
app.use(cookieparser())
//app.use ke andr jitne bhi middleware aayenge unsbko call krna hoga ...()aise

user.routes mein
 res.cookie('token',token)
        //phli value naam or doosri actual value of token
        res.send('Logged In')

....
mene password mein lowercase true kr dia ths isse passworf after hash match ni krpa rha tha isisliye mene vo comment kr dia
..........

ab kahir run kro now u can see logged in at output but where is cookies inspect-arrow(>>)-application-cookies- (click on that) cookie is there ab kya browser kuch bhi request krega server pr toh yh cookie jayegi automaticallyr hr req ke saath

chlo register krwa lia login krwa lia ab bnayenge home page
tailwind include kro play cdn se or flowbite se quic start pr click include via cdn  copy css and script

ab ise render krayenge app.js but it is not a part of user related routes so we create another file index.routes.ja

home se related or file upload etc sb idhr

index.routes.js
const express=require('express');
const { route } = require('./user.routes');
const router=express.Router();
router.get('/home',(req,res)=>{res.render('home')})
module.exports=router

now include it in app.jsk
const indexRouter=require('./routes/index.routes')
app.use('/',indexRouter)
left only '/' to make it default 
http://localhost:3000/home

home pr ab button bnate hain
now i want a popup after clicking on upload file so that i can put file there
flowbite pr iska kuch bahut accha h udhr chlte

home.ejs mein hume dopdrag upload bna lia h ab hume ek submit button chahiye

normal form jb submit krte ho post se kaam ho jayega lekin jb file upload krte ho to enc type kuch chahiye hota
<form 
            action="/upload-file" 
            method="post"
            enctype="multipart/form-data">
            ....</form>

see home.ejs

next is firebase
Firebase is a backend-as-a-service (BaaS) platform by Google.
It’s used to quickly build web and mobile apps without managing your own server.

🔹 Key uses:
Real-time database & Firestore → store and sync data live.
Authentication → login with Google, email, etc.
Hosting → deploy websites easily.
Cloud functions → run backend code without servers.
Push notifications & analytics for apps.
👉 In short: Firebase = ready-made backend for fast app development.


Okay 🙂 — in layman’s language:

Firebase is a tool by Google that helps you make apps or websites without building your own backend.
It gives you everything ready-made —
a place to store data,
an easy way for users to log in,
a space to host your site,
and tools for notifications and analytics.
So, you don’t need to manage servers — Firebase handles it for you.


When someone says “you don’t need to manage a server”, it means:
👉 In Firebase (or similar services like AWS Lambda, Vercel, etc.),
you don’t have to create, run, or maintain your own Node.js/Express server —
Firebase already provides ready-made backend services for you.

So:
In your Node + Express + MongoDB app, you build and run the server yourself (app.listen(3000) etc.).
In Firebase, the “server part” (handling requests, storing files, authentication, etc.) is already built and managed by Google — you just use it.

🧠 In short:
Firebase = Backend without managing a server yourself.
Node/Express = You write and run the server manually.

mtlb bss UI bnao or firebase se link kr do ?
Exactly ✅
👉 Firebase use karne ka matlab hai —
tumhe backend code (Express, routes, DB connection, etc.) likhne ki zarurat nahi.
Bas frontend (UI) banao — jaise HTML, React, etc.
Phir Firebase ke ready-made tools (Authentication, Database, Storage, etc.) ko directly link kar do.

🔹 Example:
Login form → Firebase Authentication
Store data → Firebase Firestore / Realtime DB
Upload image → Firebase Storage
To sum up:
Firebase = ready-made backend
You = just connect your frontend with it.


so im alreay using mongdb task is to upload file which one should use and why cant use ?
If your task is to upload files (like images, PDFs, etc.), here’s the difference clearly:

🔹 1. MongoDB
MongoDB is mainly for structured data (like usernames, emails, passwords, etc.).
It can store files using GridFS, but it’s not ideal — slow and complex for large files.
✅ Use it to store file info only (like file name, URL, user ID).

🔹 2. Firebase Storage (or Cloud Storage)
Firebase gives you a ready-made, fast, secure cloud file storage system.
Best for storing actual files (images, videos, etc.).
✅ You can store the file in Firebase, and save its URL in MongoDB.

⚙️ So what to use:
👉 Use MongoDB for user data.
👉 Use Firebase (or AWS S3, Cloudinary, etc.) for file uploads.

MongoDB ≈ “Keep record”
Firebase (or S3) ≈ “Keep the actual file”


khair firebase pr after loggin etc project name wagera dekr
create project kr dena h


as we know firebase storage is paid 
so im using supabase
for that first login create project(here drive) and bucket(here Azka)


config/supabase.config.js ✅
✔️ Correctly loads credentials and creates Supabase client.
Purpose:
→ Connects your backend (Express server) to your Supabase project using .env credentials.


✅ config/multer.config.js
🧠 What’s happening
When you upload a file from the browser:
The request first comes to Express (via your /upload route).
Multer reads the file from that request.
Because you used
const storage = multer.memoryStorage();
Multer doesn’t save the file on disk — it keeps it temporarily in RAM as a Buffer object.
That buffer is available as req.file.buffer, which you directly send to Supabase.
💡 Why temporary memory still matters
Even though the file is already in memory, it still needs a place where Multer can:
hold the file while Express is processing the request,
attach it to req.file so your route can read it,
and then pass that buffer to Supabase.
Without memoryStorage(), Multer wouldn’t know where to keep the uploaded data temporarily.
📦 After upload
Once your upload route finishes:
The request completes.
Node automatically clears that memory (the buffer is destroyed).
The file remains stored safely in Supabase.
So, in short:
Yes, the file is already in memory — but Multer needs a temporary memory container (memoryStorage) to make that possible before you send it off to Supabase


ques r u talikin about this buffer file.buffer ✅?
Yes ✅ exactly — file.buffer is the actual file data that Multer keeps temporarily in memory (RAM).
You send this buffer to Supabase → Supabase saves it → then the buffer is automatically cleared.




Exactly 👍 — these four parts are the bare minimum for Supabase file upload.
Here’s why each one is needed 👇
| Part                | Required?   | Why| ------------------- | --------- | -------------------------------------------------------------------------------------------- |
| `.from("Azka")`     | ✅ **Yes** | You must tell Supabase **which bucket** to upload into. (`Azka` is your bucket name.)        |
| `.upload()`         | ✅ **Yes** | This function actually performs the upload to Supabase storage.                              |
| `file.originalname` | ✅ **Yes** | This gives the file a name on Supabase (the same name as the uploaded file).                 |
| `file.buffer`       | ✅ **Yes** | This is the actual file data read in memory (via Multer). Without it, nothing gets uploaded. |


problem if im uploading file with same name twice then last one replaces the first one (prob what if content andr ka ag ho bss file same ho to isiliye aage ka kl dekhte)

in firebase unique:true solve this issue
but here in supabase i need to generate a unique name


  // Create a unique filename using timestamp + random string
  const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;

  const { data, error } = await supabase.storage
    .from("Azka")
    .upload(uniqueName, file.buffer, {
      upsert: false, // prevents overwriting
    });






first tell me why im doing this step why im making file schema, as file to upload ho gyi na fr ab kya?
Excellent question 💡 
If the file already uploads successfully to Supabase Storage, then why do we even need to make a file schema in MongoDB?
Let’s break it down simply 👇
🧠 Why you’re creating a File schema
Yes — Supabase stores the actual file,
but Supabase doesn’t automatically keep track of who uploaded it, its name, or how to fetch it later in your app.
That’s where MongoDB comes in.(also if file of same name then its name is manipulated using unique name generator)

📦 Supabase stores:
Just the raw file (like an image, PDF, etc.)
Organized inside a bucket (like “Azka”)
It can return a public URL, but that’s it.
Supabase doesn’t know which user uploaded it, or what category it belongs to.

🧾 MongoDB stores:
Your metadata about that file — the “record” that connects it to your users and your app’s logic.
Example of what MongoDB stores for each upload:
| Field          | Meaning                                                      |
| -------------- | ------------------------------------------------------------ |
| `path`         | The public URL of the uploaded file on Supabase              |
| `originalname` | The actual file name user uploaded                           |
| `user`         | Which user uploaded it (so you can later fetch user’s files) |

⚙️ Why this is important later
This small step allows you to:
✅ Show all files a user uploaded (e.g. “My Files” page)
✅ Delete a file from both MongoDB and Supabase easily
✅ Add more info (size, type, folder, date uploaded, etc.) later
✅ Keep Supabase purely for storage, and MongoDB for tracking & queries

🧩 In short:
🗂️ Supabase → stores file data
🧾 MongoDB → stores file info

means for authentication purpose we r using it shorlty tell?
Exactly ✅ — yes, partly for authentication and tracking.
Shortly:
You create the file schema so you can link each uploaded file to a specific user (authenticated in MongoDB).
That way you know who uploaded what, and can later:
Show only that user’s files
Prevent others from accessing them
Delete or manage files securely
So — Supabase stores the file,
MongoDB + file schema handle authentication + ownership tracking 🔒


so files.model.js bnao
(id aane wali hoti h to batana hota ki vo kisse belong krti h like here users db name (ref mein dete hain)) 
upload file mein require kro

agr user login h to hi vo home page pr ja paye or upload kr paye
as when user login hora h hum token generate kr rhe hain to hum usi token ko lekr middleware bna rhe h jo autorization ka kaam krega

abhi kya hora h ki login ni h tbbhi hum file upload kr pa rhe hain but we dont want this we want ki login ho tbhi user file upload kr paye so we use token that would generate when user do login 

sbse phle home page pr lagate hain authentication

file to upload ho gyi ab uss file ka schema upload.route mein lao(path, originalname) ab user kahan se laaye(yahan aata h authentication) to uske liye middleware bnayenge auth.js usme jwt ko require krenge

auth.js what is this line?
 const decoded = jwt.verify(token, process.env.JWT_SECRET);

as we know when we do login we got token that we saved in cookies(jwt_secret) to ab jb bhi user server pr request krega to vo token hr baar cokkies mein aayega use hi hum auth.js mein read kr rhe hain agr token ni h mean user login ni h fr aage hum uss token ko verify kra rhe hain(kya pta kisi ne temper kr dia ho so we r checking) if token is not tempered if it is then all error will come in verify and return 
return res.status(401).json
message:'Unauthorized'
or agr shi h no err to req.user=decoded
why doing this req.user=decoded
qki agr tokrn shi h to deocded ke andr yh value aayegi ( userId: user._id,
email: user.email,username: user.username)
from here user.routes.js
  const token = jwt.sign{
            userId: user._id,
            email: user.email,
            username: user.username
        }
        (jb user ne login kra to humne userid set krdi ab jb user upload kr rha tha to token ko decode krke vo user id nikaal li )

        to iss middleware ka ek hi kaam h authorization

        home or upload pr lga dia
        router.get('/home', authMiddleware, (req,res)=>...) index.route
        router.post("/", authMiddleware, upload.single("file"), async (req, res) =>... )

        or mongodb pr bhi files mein save kr dia


        now i want to show the files uploaded by particular user(jiska loginn h)  usko show krna on home page



    //  console.log(req.user)but i want all files
    const userFiles = await fileModel.find({
        user: req.user.userId
    })
    console.log(userFiles)//to ab jitni bhi file aari h unko mene frontend pr show krna  h

    now comes interesting part that will make our ejs part beneficial
    jum userFiles ka data hum bhejenge ejs pr render hone ke liye

  console.log(userFiles)
    res.render('home',{
         files: userFiles
    });mtlb hum userFiles ko home page pr bhej rhe hain with name files now how to access this on home.ejs pr





        now i want one more functionality that when i click on name or download button it should download

          <!-- accessing userFiles -->
        <div class="files mt-3 flex flex-col gap-2">
            <% files.forEach((file)=>{ %>
                <div class="p-2 cursor-pointer rounded-md bg-gray-300 flex justify-between">
                    <h1>
                        <%= file.originalname %>
                    </h1>
                    <a href="/download/<%= file.path %>"
                       class="text-blue-500 hover:text-blue-700"
                       download="<%= file.originalname %>">
                        <i class="ri-download-line"></i>
                    </a>
                </div>
                <% }) %>
        </div>
        <!-- accessing userFiles -->

        u can see currently when im clicking on this download is failing because humne abhi tk /download ka koi route ni bnaya h
        index route mein ab hum ek or route create krte hain for /download


If your bucket is public, you can directly download via
example: https://<project-id>.supabase.co/storage/v1/object/public/Azka/<filename>
but for private ones, always use signed URLs (safer).
⚠️ But — this is unsafe for user-specific storage apps (like Google Drive clones),
because anyone can open/download if they have the link.
| Use case                           | Bucket Type                   |
| ---------------------------------- | ----------------------------- |
| Public images (logos, icons, etc.) | **Public**                    |
| User-specific or sensitive files   | **Private** (with signed URL) |



see router download wala ull know 
router.get('/download/:path', authMiddleware, async (req, res) => {
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

    } 



    but after this u can file is openning not downloading and u can see 
    https://dzvuozlsfbgbesdhajej.supabase.co/storage/v1/object/sign/Azka/1761049843668-874405425-Screenshot%20(114).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMDAzOGYyMC1mNGE0LTQ2NDEtYWY3YS0xMzI1OThlYjA1ZGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBemthLzE3NjEwNDk4NDM2NjgtODc0NDA1NDI1LVNjcmVlbnNob3QgKDExNCkucG5nIiwiaWF0IjoxNzYxMDUyNjM4LCJleHAiOjE3NjEwNTI2OTh9.GWzAnhExROKXu8gmTgWTDsPCdQBs5-PWgclhb4uhWfw

    this is the link of image opened that expires after 60 sec
    after that if try to access {
  "statusCode": "400",
  "error": "InvalidJWT",
  "message": "\"exp\" claim timestamp check failed"
} this error is coming

right click krke download krlo


done drive project
Error Handling
Throw('error')
isse error aa jayegi
dekho server mein error aaye no issue aate hain lekin un error se agr 
server chlna bnd ho gya that is issue
iske do tareeqe hain 
1st try and catch

try{

}catch(err){
    res.status(500).json({
        message: 'Server Error'
    })
}
 
 500 for server error now u can see server ni rukega blki errro aa jayega Server Error 
 ab jo doosre users hinge server work kr rha hoga 
 lekin agr aap handle ni krenge to issue hoga as server bnd to baqi user ke liye server bnd ho jayega


2nd Way:
go to ur main file app.js here

write this(this is globay way of error catching)
process.on('uncaughtException',(err)=>{
    console.log('Uncaught Exception')
    console.log(err)
})
problem with this ki user ko response ni jata vo wait hi krta reh jata h 
so we avoid this 
it is like last hope
