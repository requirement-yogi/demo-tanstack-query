#!/usr/bin/env node
/*
 Simulate a user that posts random data to the server every 5 seconds.
 */

const axios = require("axios");

console.log("Starting user simulation...");
void createPost();

setInterval(() => {
    void createPost();
}, 5000);





function logPostCreated(post) {
    const date = new Date(post.date).toLocaleTimeString();
    console.log(`Created post with:
 - Id "${post.id}"
 - Title "${post.title}"
 - at ${date}
====================`);
}

async function createPost() {
    try {
        const response = await axios.post("http://localhost:3000/api/post/random");
        logPostCreated(response.data);
    } catch (error) {
        console.error("Error creating post", error);
    }
}

