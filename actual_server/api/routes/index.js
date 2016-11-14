var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlMonths = require('../controllers/months.controller.js');
var ctrlTasks = require('../controllers/tasks.controller.js');

router.route('/months')
  .get(ctrlMonths.monthGetCategory)
  .post(ctrlMonths.monthCreateOne);

router.route('/months/price')
  .get(ctrlMonths.getTotalCost);

router.route('/months/name')
  .get(ctrlMonths.monthGetAllNames);

router.route('/months/:monthId')
  .put(ctrlMonths.monthUpdateOne)
  .delete(ctrlMonths.monthDeleteOne);

router.route('/tasks')
  .get(ctrlTasks.tasksGetCategory)
  .post(ctrlTasks.taskCreateOne);

router.route('/tasks/:taskId')
  .put(ctrlTasks.taskUpdateOne);
  //.delete(ctrlMonths.monthDeleteOne);

//Counter routes
router
  .route('/tasks/counter/:taskId')
  .get(ctrlTasks.countersGetAll)
  .post(ctrlTasks.counterAddOne);


// router.route('/hotels').get(ctrlHotels.hotelsGetAll);
//
// router.route('/hotels/:hotelId').get(ctrlHotels.hotelsGetById);
//
// router.route('/hotels/new')
//     .post(ctrlHotels.hotelsAddOne);
//
// //Review Routes
// router.route('/hotels/:hotelId/reviews').get(ctrlReviews.reviewsGetAll);
//
// router.route('/hotels/:hotelId/reviews/:reviewId')
//     .post(ctrlReviews.reviewsGetOne);

module.exports = router;
