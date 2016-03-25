'use strict';

var _ = require('underscore');
var gcal = require('google-calendar');
var User = require('mongoose').model('User');

var userProfile=null;

exports.login = function(req, res, next) {
    if(!req.session.accessToken) {
        res.send(401, 'Not logged in.');
    } else {
        next();
    }
};

exports.list = function (req, res, next) {
  
    var accessToken = req.session.accessToken;
    var calendarId = req.user._doc.email;
    var calendar = new gcal.GoogleCalendar(accessToken);
    
    calendar.events.list(calendarId, {'timeMin': new Date().toISOString()}, function(err, eventList) {
        
        if (err) {
            return res.status(400).send({
                message: err
        });
        } else {
            
            var filtered = _.where(eventList.items, {summary: 'Bhuvan D'});
            console.log(filtered);
            
            res.send(JSON.stringify(eventList, null, '\t'));
        }
        
    });
};


exports.create = function (req, res, next) {
    //map request body to google calendar data structure
    
    var profile = userProfile._doc;
    
    var addEventBody = {
        'status':'confirmed',
        'summary': req.body.contact.fName + ' ' + req.body.contact.lName,
        'description': req.body.patient.patientName + '\n' + req.body.patient.emailId + '\n' + req.body.patient.contact,
        'organizer': {
          'email': profile.email,
          'self': true
        },
        'reminders':{
          'useDefault': false,
          'overrides': [
              {
                  'method': 'email',
                  'minutes': '1440'
              },
              {
                  'method': 'popup',
                  'minutes': '1140'
              }
          ]  
        },
        'start': {
          'dateTime': req.body.startdate,
        },
        'end': {
          'dateTime': req.body.enddate
        },
        'attendees': [
            {
              'email': req.body.contact.emailId,
              'organizer': true,
              'self': true,
              'responseStatus': 'needsAction'
            },
            {
              'email': req.body.patient.emailId,
              'organizer': false,
              'responseStatus': 'needsAction'
            }
        ]
    };  
   
    var calendar = new gcal.GoogleCalendar(profile.providerData.accessToken);
    
    calendar.events.insert(profile.email, addEventBody, function(err, response) {
        
        if (err) {
            return res.status(400).send({
                message: err
        });
        } else {
            res.send(response);
        }
        
    });

};

exports.load = function (req, res, next) { 
  User.findOne({
    username: 'bhuvansalanke'
  }, function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load User '));
    }

    userProfile = user;

  });
};

