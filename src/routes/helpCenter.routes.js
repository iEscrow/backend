const express = require('express');
const router = express.Router();

const helpCenterController = require('../controllers/helpCenter.controller');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/titles',  helpCenterController.getItems);
router.get('/faqs',  helpCenterController.getFAQs);
router.put('/main/:id', helpCenterController.updateMainTitle);
router.put('/sub/:id', helpCenterController.updateSubItem);
router.put('/faq-main/:id', helpCenterController.updateFAQSet);
router.put('/faq-sub/:id', helpCenterController.updateFAQItem);
router.post('/upload/main/:id', helpCenterController.uploadMainIcon);
router.post('/upload/faq-main/:id', helpCenterController.uploadFAQSetIcon);


module.exports = router;