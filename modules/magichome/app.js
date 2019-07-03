const { Control } = require('magic-home');

let light = new Control("192.168.0.126");

light.queryState().then(function(data) {
        state = data.on

        if (state == true) {
          light.setPower(false).then(success => {
            console.log('200 OK',success)
          });
        }

        if (state == false) {
          light.setPower(true).then('200 OK',success => {
            console.log(success)
          });
        }

    });
