const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const middlewares = require('./middleware')
const logs = require('./api/logs')
const app = express();

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(helmet())
app.use(morgan('common'));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

app.use(express.json())
app.get('/', (req, res) => {
    res.json({
        message: 'Hello',
    })
})

app.use('/api/logs', logs)
app.use(middlewares.errorHandler)
app.use(middlewares.notFound)
const port = process.env.PORT || 1337;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${port}`);
})
 