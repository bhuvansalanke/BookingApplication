'use strict';

module.exports = {
  app: {
    title: 'Scheduling Application',
    description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
    keywords: 'MongoDB, Express, AngularJS, Node.js',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  logo: 'modules/core/img/brand/logo.png',
  favicon: 'modules/core/img/brand/favicon.ico',
  uploads: {
    profileUpload: {
<<<<<<< HEAD
      dest: './modules/users/img/profile/uploads/', // Profile upload destination path
=======
      dest: './modules/users/client/img/profile/uploads/', // Profile upload destination path
>>>>>>> 3f230c6b331f02a2ca632f31379b0e1aa3612386
      limits: {
        fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
      }
    }
    }
};
