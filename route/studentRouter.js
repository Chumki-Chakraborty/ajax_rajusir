const router = require("express").Router();
const StudentController = require("../controller/studentController");
const verify = require("../middleware/errorCheck");
// const rateLimitMiddleware = require("../middleware/reatLimit");


router.get('/', StudentController.index);
router.get('/registration', StudentController.registration);
router.post('/registration', StudentController.registerStudent);
router.get('/update/(:id)', StudentController.update);
router.post('/update/(:id)', StudentController.updateStudent);
router.get('/delete/(:id)', StudentController.delete);


router.get('/getstudent',StudentController.getalldata)
router.get('/getstudent/addfiled',StudentController.addfiled)
router.get('/getstudent/ralimit',StudentController.addlimit)
router.get('/getstudent/replaceroot',StudentController.replaceRoot)

router.post('/add/geo/location',StudentController.geoNear)
module.exports = router;