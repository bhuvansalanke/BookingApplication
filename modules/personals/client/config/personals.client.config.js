'use strict';

// Configuring the Personals module
angular.module('personals').run(['Menus',
  function (Menus) {
    // Add the personals dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'personals',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'personals', {
      title: 'Employees',
      state: 'personals.list'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'personals', {
      title: 'Appointment Types',
      state: 'personals.appttypelist'
    });
  }
]);
