const app = require('express')()
const httpServer = require('http').createServer(app);
const port = 3001
const io = require("socket.io")(httpServer,{
  "cors": {origin: "http://localhost:3000", methods: ["GET", "POST"]}
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

io.on("connection", (socket) => {
  console.log("Yay! Socket connected!")
})
