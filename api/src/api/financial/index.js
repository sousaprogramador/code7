const { Router } = require('express');
const router = Router();

router.post('/',require('./financial-create'));

module.exports = router;