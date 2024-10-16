const express = require('express');
const path = require('path');
function expressConfig(app) {
    app.use('/static', express.static('static'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
}
module.exports = {expressConfig};
