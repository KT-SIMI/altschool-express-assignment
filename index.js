const express = require('express')
const itemRouter = require('./routes/itemRouter')

const port = 3003

const app = express()

app.use(express.json())

app.use('/items', itemRouter)

app.get('*', (req, res) => {
    res.status(404).json({ data: null, error: 'Route not found' })
})

app.listen(port, () => console.log(`listening on port: ${port}`))