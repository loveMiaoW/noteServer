const express = require('express');
const router = require('express')();
const path = require('path')

router.post('/getSidebar', require('./route/getSidebar'));
// router.get('/search', require('./route/search'));
router.use(express.static(path.join(__dirname, 'public')));
router.use(require('./route/notfound'));

router.listen(8090);
