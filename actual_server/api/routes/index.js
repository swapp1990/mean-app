var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlMonths = require('../controllers/months.controller.js');

router.route('/months')
  .get(ctrlMonths.monthGetAll)
  .post(ctrlMonths.monthCreateOne);

router.route('/months/:monthId')
  .put(ctrlMonths.monthUpdateOne)
  .delete(ctrlMonths.monthDeleteOne);
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
