'use strict';

// Configuring the Events module
angular.module('events').run(['Menus',
  function (Menus) {
    // Add the events dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Scheduling',
      state: 'events.list'
    });
  }
]);
