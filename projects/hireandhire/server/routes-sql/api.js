var express = require('express');
var router = express.Router();
var jobs = require('../model/jobs');
var skills = require('../model/skills');
var users = require('../model/users');

router.get('/jobs', function (req, res, next) {
    jobs.getAllJobs(function (result) {
        res.json(result);
    });
});

router.post('/applybyjobanduserid', function (req, res, next) {
    jobs.applyByJobAndUserId(req, function (result) {
        res.json(result);
    });
});

router.get('/skillsjobs', function (req, res, next) {
    skills.getSkillsForAllJobs(function (result) {
        res.json(result);
    });
});

router.get('/skills', function (req, res, next) {
    skills.getAllSkills(function (result) {
        res.json(result);
    });
});

router.post('/validateuser', function (req, res, next) {
    users.validateUser(req, function (result) {
        res.json(result);
    });
});

router.get('/appliedbyuser/:user_id', function (req, res, next) {
    jobs.appliedJobsByUserId(req.params.user_id, function (result) {
        res.json(result);
    });
});

router.get('/skills/:job_id', function (req, res, next) { // OLD
    skills.getSkillByJobId(req.params.job_id, function (result) {
        res.json(result);
    });
});

router.get('/job/:job_id', function (req, res, next) { // OLD
    skills.getJobById(req.params.job_id, function (result) {
        res.json(result);
    });
});

module.exports = router;