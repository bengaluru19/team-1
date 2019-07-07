const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const crypto = require('crypto');

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    console.log("adad", req)
    res.end('Hello world');
})

app.use(bodyParser.json());

const url = 'mongodb://localhost:27017'

app.post('/getEventDetails', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const collection = db.collection('event');
        collection.find({ "_id": new ObjectId(req.body._id) }).toArray((err, result) => {
            if (err) throw err;
            res.end(JSON.stringify(result[0]));
        })
    })
});

app.post('/getEvents', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const collection = db.collection('event');
        collection.find({}).toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            res.json(result);
        })
    })
})


app.post('/createEvent', (req, res) => {
    // console.log('create event', req.body);
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const collection = db.collection('event');
        collection.insert({
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            date: req.body.date,
            from: req.body.from,
            to: req.body.to,
            capacity: req.body.capacity,
            skillsRequired: req.body.skillsRequired
        }, (err, docs) => {
            if (err) throw err;
            console.log(docs.ops[0]._id)
            res.end(docs.ops[0]._id.toString());
        });
    })
})

app.post('/getVolunteerDetails', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const collection = db.collection('volunteer');
        console.log(req.body._id);
        collection.find({ "_id": new ObjectId(req.body._id) }).toArray((err, result) => {
            if (err) throw err;
            res.end(JSON.stringify(result));
        })
    })
});

app.post('/getVolunteers', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const collection = db.collection('volunteer');
        collection.find({ }).toArray((err, result) => {
            if (err) throw err;
            res.end(JSON.stringify(result));
        })
    })
})


app.post('/createVolunteer', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const collection = db.collection('volunteer');

        const userCollection = db.collection('userVolunteer');
        userCollection.insert({
            email: req.body.email,
            password: crypto.createHash('sha256').update(req.body.password).digest('hex')
        });
        collection.find({email: req.body.email}).count((err, count) => {
            if(count !== 0){
                res.end(JSON.stringify({error: 'Mail already exists'}));
            }
        })
        collection.insert({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            organization: req.body.organization,
            registeredEvents: [],
            completedEvents: [],
        }, (err, docs) => {
            if (err) throw err;
            console.log(docs.ops[0]._id)
            res.end(docs.ops[0]._id.toString());
        });
    })
})

app.post('/authenticateVolunteer', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const collection = db.collection('userVolunteer');
        collection.find({
            email: req.body.email,
            password: crypto.createHash('sha256').update(req.body.password).digest('hex')
        }).toArray((err, result) => {
            if (err) throw err;
            console.log(result)
            if (result.length === 0 || result[0] === undefined){
                res.status(400).json({error: 'wrong password'})
            } 
            else
                res.json(result[0]._id);
            res.end();
            
        })
    })
});

app.post('/registerEvent', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const collection = db.collection('registerEvent');
        const eventId = req.body.eventId;
        const volunteerId = req.body.volunteerId;

        collection.find({ volunteerId: volunteerId, eventId: eventId }).count((err, count) => {
            if (err) throw err;
            console.log(count);
            if (count !== 0) {
                res.end(JSON.stringify({ error: 'duplicate' }));
            }
        })

        collection.insert({
            eventId,
            volunteerId
        })
        res.end('registered');
    })
});

app.post('/adminAcceptsEvent', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const registerEvent = db.collection('registerEvent');
        const volunteer = db.collection('volunteer');
        const eventId = req.body.eventId;
        const volunteerId = req.body.volunteerId;
        volunteer.update({ "_id": new ObjectId(volunteerId) },
            { $addToSet: { "registeredEvents": eventId } }
        );
        registerEvent.deleteOne({ eventId: req.body.eventId, volunteerId: req.body.volunteerId });
    });
    res.end('accepted');
});

app.post('/adminRejectsEvent', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const registerEvent = db.collection('registerEvent');
        registerEvent.deleteOne({ eventId: req.body.eventId, volunteerId: req.body.volunteerId });
    });
    res.end('rejected');
});

app.post('/getVolunteersForEvent', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const arr = []
        const collection = db.collection('registerEvent');
        const eventId = req.body.eventId;
        collection.find({eventId: eventId}).toArray((err, result) => {
            if(err) throw err;
            res.end(JSON.stringify(result))
        })
    })
})

app.post('/getEventsOfVolunteer', (req, res) => {
    console.log('get Events of volunteer')
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        const collection = db.collection('registerEvent');
        const volunteerId = req.body.volunteerId;

        collection.find({ volunteerId: volunteerId }).toArray((err, result) => {
            if (err) throw err;
            console.log('result', result);
            res.end(JSON.stringify(result));
        })
    })
})

app.post('/authenticateAdmin', (req, res) => {
    mongoClient.connect(`${url}/team1db`, (err, db) => {
        if (err) throw err;
        // console.log(req.body);
        // console.log(crypto.createHash('sha256').update(req.body.password).digest('hex'));
        const collection = db.collection('userAdmin');
        collection.find({
            email: req.body.email,
            password: crypto.createHash('sha256').update(req.body.password).digest('hex').toLowerCase()
        }).count((err, count) => {
            if (err) throw err;
            console.log(count);
            if (count !== 0)
                res.json('1');
            else
                res.end('0');
        })
        // res.end('0');
    })
})

app.listen(5000
    , () => {
    console.log('listening..');
});
