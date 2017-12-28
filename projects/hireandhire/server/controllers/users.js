const { MongoClient, ObjectId } = require('mongodb');
const mongoDbUrl = require('../helpers/db');

console.log(mongoDbUrl);

module.exports = {
    createUser: (req, res, next) => {
        let usersObj;
        let database;

        if (!req.body.email) {
            return res.status(403).json({ error: 'Email is mandatory' });
        }

        if (!req.body.name) {
            return res.status(403).json({ error: 'Name is mandatory' });
        }
        if (!req.body.location) {
            req.body.location = {};
        }
        if (!req.body.description) {
            req.body.description = {};
        }

        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('users');
            })
            .then(users => {
                usersObj = users;
                return users.findOne({ email: req.body.email });
            })
            .then(inUse => {
                if (inUse) {
                    console.log(inUse);
                    return res.status(200).json({ error: 'Email is already in use' });
                }
                let user = {
                    name: {
                        first: req.body.name.first,
                        last: req.body.name.last
                    },
                    location: {
                        lng: req.body.location.lng || '',
                        lat: req.body.location.lat || ''
                    },
                    email: req.body.email,
                    password: req.body.password,
                    description: {
                        public: req.body.description.public || '',
                        private: req.body.description.private || ''
                    }
                };

                usersObj.insertOne(user, function(err, result) {
                    if (err) throw err;
                    database.close();
                    res.status(200).json({ /* successes: 'ok', */ userId: result.insertedId });
                });
            })
            .catch(err => console.log(err));
    },
    findUser: (req, res, next) => {
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('users');
            })
            .then(users => {
                return users.findOne(ObjectId(req.params.email));
            })
            .then(user => {
                if (!user) {
                    return res.status(200).json({ error: 'User not found' });
                }
                database.close();
                res.status(200).json(/* successes: 'ok', */ user);
            })
            .catch(err => console.log(err));
    },
    validateUser: (req, res, next) => {
        let database;
        if (!req.body.email) {
            return res.status(403).json({ error: 'Email is mandatory' });
        }
        if (!req.body.password) {
            return res.status(403).json({ error: 'Password is mandatory' });
        }

        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('users');
            })
            .then(users => {
                return users.findOne(
                    {
                        email: req.body.email,
                        password: req.body.password
                    },
                    { password: 0 }
                );
            })
            .then(user => {
                if (!user) {
                    return res.status(200).json(false);
                }
                database.close();
                res.status(200).json(/* successes: 'ok', */ user);
            })
            .catch(err => console.log(err));
    },
    userEmailById: (req, res, next) => {
        if (!req.body.array) {
            return res.status(403).json({ error: 'userid is mandatory' });
        }
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('users');
            })
            .then(users => {
                let array = req.body.array.map(element => {
                    return ObjectId(element);
                });
                return users.find({ _id: { $in: array } }, { password: 0 }).toArray();
            })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'userid not found' });
                }
                database.close();
                res.status(200).json({ user });
            })
            .catch(err => console.log(err));
    },
    publishedJobsByEmail: (req, res, next) => {
        if (!req.params.email) {
            return res.status(403).json({ error: 'Job id is mandatory' });
        }
        let database;
        MongoClient.connect(mongoDbUrl)
            .then(db => {
                database = db;
                return db.collection('jobs');
            })
            .then(jobs => {
                console.log(req.params.email);
                return jobs.find({ publisher: req.params.email }).toArray();
            })
            .then(job => {
                if (!job) {
                    return res.status(404).json({ error: 'Job not found' });
                }
                database.close();
                res.status(200).json(job);
            })
            .catch(err => console.log(err));
    }
};
