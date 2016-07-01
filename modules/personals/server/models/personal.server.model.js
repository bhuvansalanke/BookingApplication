//database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ApptTypeSchema = require('./appt-type.server.model');

var PersonalSchema = new Schema({
    created: {
    type: Date,
    default: Date.now
    },
    fName: {
        type: String,
        default: '',
        required: 'Please fill your first name',
        trim: true
    },
    lName: {
        type: String,
        default: '',
        required: 'Please fill your last name',
        trim: true
    },
    emailId: {
        type: String,
        default: '',
        required: 'Please fill your email id',
        trim: true
    },
    contact: {
        type: String,
        default: '',
        required: 'Please fill your contact number',
        trim: true
    },
    isConsultant: {
        type: Boolean
    },
    speciality: {
        type: String,
        default: '',
        trim: true
    },
    qualification: {
        type: String,
        default: '',
        trim: true
    },
<<<<<<< HEAD
      experience: {
=======
    experience: {
>>>>>>> 3f230c6b331f02a2ca632f31379b0e1aa3612386
        type: String,
        default: '',
        trim: true
    },
<<<<<<< HEAD
     rating: {
=======
    rating: {
>>>>>>> 3f230c6b331f02a2ca632f31379b0e1aa3612386
        type: Number,
        default: 0,
        trim: true
    },
<<<<<<< HEAD
     adminemailId: {
        type: String,
        default: '',
        required: 'Please fill Admin email id',
        trim: true
    },
    image: {
        type: String,
    default: 'modules/personals/client/img/buttons/default.png'
    },
=======
>>>>>>> 3f230c6b331f02a2ca632f31379b0e1aa3612386
    
    treatments: [ApptTypeSchema],
    
    slots: [{
        day: {
            type: String,
            default: '',
            required: 'Please fill the day',
            trim: true
        } ,
        starttime: {
            type: Date
        },
        endtime: {
            type: Date
        },
        location: {
            type: String
        }
    }],
    
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Personal', PersonalSchema);
