$(document).ready(function() {
    var screen = $('#screen');
    var divide = '&#247;';
    var multiply = '&#215;';
    var mathScreen = '';
    screen.text('');

    function newEntry(btn, value) {
        $('#' + btn).click(function() {
            var screenTxt = screen.text();
            if (screenTxt.length < 11 && lastIsOper() === false) {
                    mathScreen += value;
                    screen.html(function(i, origin) {
                         return origin += value;
                    });
            } else if (lastIsOper() === true) {
                    mathScreen += value;
                    screen.html(value);
            }


        });

    } //newEntry

    function lastIsOper() {
        if ( mathScrLast() != '+' &&
             mathScrLast() != '-' &&
             mathScrLast() != '*' &&
             mathScrLast() != '/'

         ) { return false; }
        else { return true; }
    }

    function newOperEntry(btn, value) {
        $('#' + btn).click(function() {
            if (mathScrLast() !== value) {
                mathScreen += value;
            }
        });
    }

    function mathScrLast() {
        return mathScreen.charAt(mathScreen.length - 1); }

    function allClear() {
        screen.html('');
        mathScreen = '';
    }

    function equal() {
        if (mathScreen != '') {
            var result = eval(mathScreen);
            screen.html(result.toString());
            mathScreen = result.toString();
        }
    }

    function getPercent() {
        if (mathScreen != '') {
            var result = eval(mathScreen) / 100;
            screen.html(result + '%');
            mathScreen = result;
        }
    }


    $('#calc-ac').click(allClear);
    $('#calc-equal').click(equal);
    $('#calc-perc').click(getPercent);

    newEntry('calc-1', '1');
    newEntry('calc-2', '2');
    newEntry('calc-3', '3');
    newEntry('calc-4', '4');
    newEntry('calc-5', '5');
    newEntry('calc-6', '6');
    newEntry('calc-7', '7');
    newEntry('calc-8', '8');
    newEntry('calc-9', '9');
    newEntry('calc-0', '0');
    newEntry('calc-dot', '.');

    newOperEntry('calc-minus', '-');
    newOperEntry('calc-plus', '+');
    newOperEntry('calc-divide', '/');
    newOperEntry('calc-mult', '*');


    $('#btn-console').click(function() {
        console.log(mathScreen);
    });

});
