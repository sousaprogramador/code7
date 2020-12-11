const { Router } = require('express');
const router = Router();

router.get('/',require('./financial-list'));
router.post('/',require('./financial-create'));
router.get('/:_id',require('./financial-show'));


module.exports = router;