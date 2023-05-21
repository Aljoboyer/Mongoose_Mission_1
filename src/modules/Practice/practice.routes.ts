import { PracticeAggregationController, PracticeQueryController, postManyPracticeData } from "./practice.controller";


const router = require("express").Router();

router.post('/insertAllPracticeData', postManyPracticeData)
router.get('/queryPracticeData', PracticeQueryController)
router.get('/applyingAggregation', PracticeAggregationController)

export default router

  