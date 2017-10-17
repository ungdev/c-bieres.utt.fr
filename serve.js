const express = require('express')
const app = express()

app.use(express.static('dist'));
app.use('/assets', express.static('assets'));

// run server
app.listen('8080', _ => console.log('Server is listening on port 8080...'))
