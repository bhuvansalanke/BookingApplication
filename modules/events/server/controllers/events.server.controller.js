'use strict';

var gcal = require('google-calendar');
var _ = require('underscore');

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
        if(err) return next(err);
        
        var objA = _.pluck(eventList, 'accessRole');
        var objB = _.pick(eventList, ['accessRole']);
        
        console.log(objB);
        
        
        for (var index = 0; index < eventList.items.length; index++) {
            var item = eventList.items[index];
            
            console.log(item.start.dateTime);
            console.log(item.end.dateTime);
            console.log(item.attendees[0].email);
            
            
        }
        
        res.send(JSON.stringify(eventList, null, '\t'));
    });
};


exports.create = function (req, res, next) {
    //map request body to google calendar data structure
    var addEventBody = {
        'status':'confirmed',
        'summary': req.body.contact.fName + ' ' + req.body.contact.lName,
        'description': req.body.contact, //+ '\n' + req.body.contact.details,
        'organizer': {
          'email': req.user._doc.email,
          'self': true
        },
        'start': {
          'dateTime': req.body.startdate,
        },
        'end': {
          'dateTime': req.body.enddate
        },
        'attendees': [
            {
              'email': req.user._doc.email,
              'organizer': true,
              'self': true,
              'responseStatus': 'needsAction'
            },
            {
              'email': req.body.contact.emailId,
              'organizer': false,
              'responseStatus': 'needsAction'
            }
        ]
    };

    var calendar = new gcal.GoogleCalendar(req.session.accessToken);
    calendar.events.insert(req.user._doc.email, addEventBody, function(err, response) {
        if(err) {
            console.log(err);
            return next(err);
        }

        res.send(response);
    });

};


