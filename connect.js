const mongoose= require('mongoose');

async function connectmongodb(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectmongodb,
};

