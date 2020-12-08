const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const url = 'http://localhost';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event).catch(console.log)//Posts
    axios.post('http://comments-srv:5000/events', event).catch(console.log) //Comments
    axios.post('http://query-srv:4003/events', event).catch(console.log) //Query
    axios.post('http://moderation-srv:4004/events', event).catch(console.log) //Moderation

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => console.log('Listening on 4005'));