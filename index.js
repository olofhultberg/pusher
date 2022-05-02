const express = require('express');
const cors = require('cors');
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1385326",
  key: "451f9189d7457b091a53",
  secret: "037982bdae97c87993a3",
  cluster: "eu",
  useTLS: true
});

const app = express();

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:8080' ]
}))

app.use(express.json());

app.get('/', (req, res)=>{
  res.send('Hello 😀')
})

app.post('/api/messages', async (req, res)=>{
    await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
      });
    res.status(200).json([]);
})

const port = process.env.PORT || 8000

console.log(`Listening to port ${port}`);

app.listen(port)