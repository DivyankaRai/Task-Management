const express = require('express')
const cors = require('cors')
const route = require('./routes')

const app = express()
app.use(express.json())
app.use(cors())
app.use(route)


app.listen(8080,()=>{
    console.log("server started at port 8080")
})