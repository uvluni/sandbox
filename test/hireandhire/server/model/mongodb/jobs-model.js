const { MongoClient, ObjectId } = require('mongodb');
const mongoDbUrl = require('../../helpers/db');

module.exports = {
    getJobs() {
        let database;
        return MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('jobs');
            })
            .then(jobs => {
                return jobs.find({}, { applicants: 0 }).toArray();
            })
            .then(jobs => {
                database.close();
                return jobs;
            })
            .catch(err => console.log(err));
    },
    createJob(req) {
        let database;
        return MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('jobs');
            })
            .then(jobs => {
                if (!req.body.title) {
                    throw res.status(403).json({ error: 'Title is mandatory' });
                }
                if (!req.body.email) {
                    throw res.status(403).json({ error: 'Publisher email is mandatory' });
                }
                if (!req.body.location) {
                    req.body.location = {};
                }

                let job = {
                    title: req.body.title,
                    publisher: req.body.email,
                    publishedDate: new Date(),
                    skills: req.body.skills,
                    applicants: [],
                    description: req.body.description || '',
                    location: {
                        lat: req.body.location.lat || '',
                        lng: req.body.location.lng || ''
                    }
                };
                return jobs.insertOne(job);
            })
            .then(result => {
                database.close();
                return { jobID: result.insertedId };
            })
            .catch(err => console.log(err));
    }
};
