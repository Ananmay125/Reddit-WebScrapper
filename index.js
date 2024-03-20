const express = require('express');
const axios = require('axios');
const app = express();

const subreddit = 'memes';
const NUM_MEMES = 8;

let afterParam = '';

app.get('/random-memes', async (req, res) => {
    try {
        const redditResponse = await axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=${NUM_MEMES}&after=${afterParam}`);
        const memes = redditResponse.data.data.children.map(post => ({
            title: post.data.title,
            imageUrl: post.data.url_overridden_by_dest
        }));
        afterParam = redditResponse.data.data.after;
        res.json(memes);
    } catch (error) {
        console.error('Error fetching memes:', error);
        res.status(500).send('Error fetching memes');
    }
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
