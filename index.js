var express = require('express')
var axios = require('axios')
const path = require('path');
var app = express()

app.set('view engine', 'ejs');
app.set('views', './pages/');
app.use(express.static("public"));

app.get('/', async function (req, res) {
    var book_search = req.query.book_search
    var hide = false
    if (book_search == undefined || book_search == '') {
        hide = true
    }
    var replaced = book_search.split(' ').join('+');
    var results = null
    try {
        results = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${replaced}`)
        results = results.data.items
    } catch (err) {
        console.error(err)
    }
    res.render('index', {results:results, hide:hide})
})

var server = app.listen(5000, function() {
    console.log('Servidor De Desenvolvimento Rodando na Porta 5000')
})