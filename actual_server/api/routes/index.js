var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlMonths = require('../controllers/months.controller.js');
var ctrlTasks = require('../controllers/tasks.controller.js');

//Months App
router.route('/months')
  .get(ctrlMonths.monthGetCategory)
  .post(ctrlMonths.monthCreateOne);

router.route('/months/price')
  .get(ctrlMonths.getTotalCost);

router.route('/months/name')
  .get(ctrlMonths.monthGetAllNames);

router.route('/months/details')
  .get(ctrlMonths.monthGetAllDetails);

router.route('/months/:monthId')
  .put(ctrlMonths.monthUpdateOne)
  .delete(ctrlMonths.monthDeleteOne);

router.route('/search')
  .get(ctrlMonths.getDataBasedOnQuery);

router.route('/search/details')
  .get(ctrlMonths.getDataByDetails);

//Tasks App
router.route('/tasks')
  .get(ctrlTasks.tasksGetCategory)
  .post(ctrlTasks.taskCreateOne);

router.route('/tasks/:taskId')
  .put(ctrlTasks.taskUpdateOne)
  .delete(ctrlTasks.taskDeleteOne);

//Counter routes
router
  .route('/tasks/counter/:taskId')
  .get(ctrlTasks.countersGetAll)
  .post(ctrlTasks.counterAddOne);

router
  .route('/tasks/:taskId/counter/:counterId')
  .put(ctrlTasks.counterUpdateOne)
  .delete(ctrlTasks.counterDeleteOne);
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
