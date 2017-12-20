const express = require('express');
const router = express.Router();

const JobController = require('../controllers/jobs');

router.route('/').post(JobController.createJob);
router.route('/:id').get(JobController.findJob);
router.route('/delete/:id').get(JobController.deleteJob);

router.route('/').get(JobController.getJobs);
router.route('/apply').post(JobController.applyJob);
router.route('/unapply').post(JobController.removeApplyJob);

router.route('/applicant/:id').get(JobController.getJobsByApplicant);

module.exports = router;
