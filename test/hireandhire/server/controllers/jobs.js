const { MongoClient, ObjectId } = require('mongodb');
const mongoDbUrl = require('../helpers/db');
const mongoDbConnection = require('../model/mongodb/jobs-model');

module.exports = {
    createJob: (req, res, next) => {
        mongoDbConnection.createJob(req).then(jobId => {
            res.status(200).json(jobId);
        });
    },
    findJob: (req, res, next) => {
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('jobs');
            })
            .then(jobs => {
                return jobs.findOne(ObjectId(req.params.id));
            })
            .then(job => {
                if (!job) {
                    return res.status(404).json({ error: 'Job not found' });
                }
                database.close();
                res.status(200).json(job);
            })
            .catch(err => console.log(err));
    },
    deleteJob: (req, res, next) => {
        let database;
        let jobsObj;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('jobs');
            })
            .then(jobs => {
                jobsObj = jobs;
                return jobs.findOne(ObjectId(req.params.id));
            })
            .then(job => {
                if (!job) {
                    return res.status(404).json({ error: 'Job not found' });
                }
                jobsObj.remove({ _id: ObjectId(req.params.id) });

                database.close();
                res.status(200).json(job);
            })
            .catch(err => console.log(err));
    },
    getJobs: (req, res, next) => {
        mongoDbConnection.getJobs().then(jobs => {
            res.status(200).json(jobs);
        });
    },
    applyJob: (req, res, next) => {
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('jobs');
            })
            .then(jobs => {
                console.log(req.body);
                if (!req.body.jobId) {
                    throw res.status(403).json({ error: 'Job ID is mandatory' });
                }
                if (!req.body.applicantId) {
                    throw res.status(403).json({ error: 'Applicant id is mandatory' });
                }
                return jobs;
            })
            .then(jobs => {
                return jobs.update(
                    { _id: ObjectId(req.body.jobId) },
                    { $addToSet: { applicants: req.body.applicantId } }
                );
            })
            .then(job => {
                console.log('Job applied');
                database.close();
                res.status(200).json(job);
            })
            .catch(err => console.log(err));
    },
    removeApplyJob: (req, res, next) => {
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('jobs');
            })
            .then(jobs => {
                console.log(req.body);
                if (!req.body.jobId) {
                    throw res.status(403).json({ error: 'Job ID is mandatory' });
                }
                if (!req.body.applicantId) {
                    throw res.status(403).json({ error: 'Applicant id is mandatory' });
                }
                return jobs;
            })
            .then(jobs => {
                return jobs.update({ _id: ObjectId(req.body.jobId) }, { $pull: { applicants: req.body.applicantId } });
            })
            .then(job => {
                console.log('Job application cancelled');
                database.close();
                res.status(200).json(job);
            })
            .catch(err => console.log(err));
    },
    getJobsByApplicant: (req, res, next) => {
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('jobs');
            })
            .then(jobs => {
                return jobs.find({ applicants: req.params.id }).toArray();
            })
            .then(jobs => {
                database.close();
                res.status(200).json(jobs);
            })
            .catch(err => console.log(err));
    }
};
