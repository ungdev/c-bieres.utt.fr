const express = require('express')
const app = express()

app.use(express.static('build'));

// run server
app.listen('8080', _ => console.log('Server is listening on port 8080...'))
