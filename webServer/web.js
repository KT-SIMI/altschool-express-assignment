const express = require('express')
const path = require('path')


const app = express()

const PORT = 5000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})