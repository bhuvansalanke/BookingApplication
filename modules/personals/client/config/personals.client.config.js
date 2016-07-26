'use strict';

// Configuring the Personals module
angular.module('personals').run(['Menus',
    function(Menus) {
        // Add the personals dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Configuration',
            state: 'personals',
            type: 'dropdown',
            roles: ['user']
        });

<<<<<<< HEAD
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'personals', {
      title: 'Dentists',
      state: 'personals.list'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'personals', {
      title: 'Treatment Types',
      state: 'personals.appttypelist'
    });
  }
=======
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
>>>>>>> 3f230c6b331f02a2ca632f31379b0e1aa3612386
]);
