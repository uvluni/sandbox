const { MongoClient, ObjectId } = require('mongodb');
const mongoDbUrl = require('../helpers/db');

module.exports = {
    createSkill: (req, res, next) => {
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('skills');
            })
            .then(skills => {
                if (!req.body.title) {
                    throw res.status(403).json({ error: 'Title is mandatory' });
                }

                let skill = {
                    title: req.body.title
                };

                skills.insertOne(skill, function(err, result) {
                    if (err) throw err;
                    console.log('Skill added');
                    database.close();
                    res.status(200).json({ /* successes: 'ok', */ skillID: result.insertedId });
                });
            })
            .catch(err => console.log(err));
    },
    findSkill: (req, res, next) => {
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('skills');
            })
            .then(skills => {
                return skills.findOne(ObjectId(req.params.id));
            })
            .then(skill => {
                if (!skill) {
                    return res.status(404).json({ error: 'Skill not found' });
                }
                database.close();
                res.status(200).json(/* successes: 'ok', */ skill);
            })
            .catch(err => console.log(err));
    },
    getSkills: (req, res, next) => {
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('skills');
            })
            .then(skills => {
                return skills.find().toArray();
            })
            .then(skills => {
                database.close();
                res.status(200).json(skills);
            })
            .catch(err => console.log(err));
    }
};
