const unwindController = require("../controller/unwindController");

const router = require("express").Router();


router.post('/unwind/add', unwindController.add);
router.get('/unwind/all/data', unwindController.alldata);
router.get('/allvehicaldata',unwindController.AllVehicalData)

module.exports = router;