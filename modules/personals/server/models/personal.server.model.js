//database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApptTypeSchema = new Schema({
    description: {
        type: String,
        default: '',
        required: 'Please fill the procedure',
        trim: true
    },
    duration: {
        type: Number
    },
    price: {
        type: Number
    },
    appttypeid: {
    type: Schema.ObjectId,
    ref: 'ApptTypeId'
    }
});

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
    treatments: [ApptTypeSchema],
    user: {
    type: Schema.ObjectId,
    ref: 'User'
    }
});

mongoose.model('Personal', PersonalSchema);