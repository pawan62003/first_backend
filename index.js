const exepress = require('express');
const { connection } = require('./db');
const app = exepress();
const {userRoute} = require('./route/user.route');
const jwt = require('jsonwebtoken');
const { auth } = require('./middleware/auth.middleware');
const { noteRoute } = require('./route/note.route');
const cors = require('cors')

app.use(exepress.json());

app.use(cors())
app.use('/users',userRoute);
app.use(auth)

app.use('/notes',noteRoute);

app.get("/home",(req,res)=>{
    res.status(200).send("Home Page")
})

app.listen(8000,async()=>{
    try {
        await connection
        console.log("you are connected to DB")
    } catch (error) {
        console.log("something wrong")
        console.log(error);
    }
   console.log("server is running port 8080")
})