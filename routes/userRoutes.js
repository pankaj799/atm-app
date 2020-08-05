const express = require('express');
const router = express.Router();
const atmcontroller = require('../controller/atmController');

router.get('/', atmcontroller.gethome);

router.get('/login', atmcontroller.getlogin);

router.post('/data', atmcontroller.postData);

router.post('/check', atmcontroller.postcheck);

router.post('/denomination', atmcontroller.postamount);

router.post('/withden', atmcontroller.postwithden);

router.post('/withoutden', atmcontroller.postwithoutden);

router.post('/finish', atmcontroller.postfinish);



module.exports = router;
