const { Router } = require('express');
const router = Router();
const {getByCoordinatesPlaces} = require('../controllers/coordinates.controller');
router.route('/')
    .get(getByCoordinatesPlaces)
   
module.exports = router;