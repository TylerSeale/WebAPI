       'use strict';

        module.exports = {
          passwordCheck: passwordCheck
        };

        function passwordCheck(username, password, cb) {
          var check = (username === 'Auth' && password === 'good');
          cb(null, check);
        }