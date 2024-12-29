// generate a random url for user pfp.

function randomProfilePic() {
    const id = Math.floor(Math.random() * 23) + 1;
    const imageUrl = `/icons/${id}.png`;

    return imageUrl;
}

module.exports = randomProfilePic;
