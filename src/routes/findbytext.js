const { Router } = require('express');
const router = Router();
const {getFindByText} = require('../controllers/findbytext.controller');
router.route('/')
    .get(getFindByText)
   
module.exports = router;