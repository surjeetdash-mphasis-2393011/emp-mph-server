const express = require('express')
var bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/empmphdb'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const con = mongoose.connection
con.on('open', (error) => {
    if (!error) {
        console.log('DB connected successfully...')
    } else {
        console.log('Error in DB connection...')
    }
})


app.get("/", (req, res) => {
    res.send("<h1>Hello World !!</h1>")
})

const userRouter = require('./routes/users')
app.use('/users', userRouter)


app.listen(9000, () => {
    console.log('Server started')
})