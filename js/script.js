$(document).ready(function() {
    var divide = '&#247;';
    var multiply = '&#215;';
    var screen = $('#screen');//calculator's screen
    var mathScreen = '';//where all calculations happen
    var startClean = false; //start with clear screen

    screen.text('');

    function mathScrLast() {
        return mathScreen.charAt(mathScreen.length - 1); }

    function mathScrFirst() {
        return mathScreen.charAt(0); }

    function setMathScrLast(value) {
        var temp = mathScreen.slice(0,-1);
        mathScreen = temp + value;
    }

    //remove invalid math operators in the begining and the end
    function removeSideOper() {
        if (mathScreen != '') {
            if (lastIsOper() === true) {
                setMathScrLast('');
            }
            if (mathScrFirst() == '*' || mathScrFirst() == '/') {
                mathScreen = mathScreen.slice(1);
            }
        }
    }

    //start with clear screen
    function allClear() {
        screen.html('');
        mathScreen = '';
    }

    function lastIsOper() {
        if ( mathScrLast() != '+' &&
             mathScrLast() != '-' &&
             mathScrLast() != '*' &&
             mathScrLast() != '/'

         ) { return false; }
        else { return true; }
    }

    //to enter negative value
    function startWithMinus() {
        if (mathScreen == '-') {
            return true;
        } else { return false; }
    }

    //Main Functions

    function newEntry(btn, value) {
        $('#' + btn).click(function() {
            var screenTxt = screen.text();
            if (screenTxt.length < 11 &&
                lastIsOper() === false &&
                startClean === false
            ) {
                mathScreen += value;
                screen.html(function(i, origin) {
                     return origin += value;
                });
            } else if (lastIsOper() === true) {
                if (startWithMinus() === false ) {
                    mathScreen += value;
                    screen.html(value);
                } else {
                    mathScreen += value;
                    screen.html(function(i, origin) {
                         return origin += value;
                    });
                }
            } else if (startClean === true) {
                mathScreen = value;
                screen.html(value);
                startClean = false;
            }
        });

    } //newEntry

    function newOperEntry(btn, value) {
        $('#' + btn).click(function() {
            if (lastIsOper() === true) {
                setMathScrLast(value);
                startClean = false;
            } else if (value == '-' && screen.text() == '') {
                mathScreen += value;
                screen.text(value);
                startClean = false;
            } else {
                mathScreen += value;
                startClean = false;
            }
        });
    }

    function equal() {
        removeSideOper();
        if (mathScreen != '') {
            var result = eval(mathScreen);
            if (result.toString().length > 11) {
                result = result.toPrecision(8);
            }
            screen.html(result.toString());
            mathScreen = result.toString();
            startClean = true;
        }
    }

    function getPercent() {
        removeSideOper();
        if (mathScreen != '') {
            var result = eval(mathScreen) / 100;
            if (result.toString().length > 11) {
                result = result.toPrecision(8);
            }
            screen.html(result.toString() + '%');
            mathScreen = result.toString();
            startClean = true;
        }
    }

    function clearLastEntry() {
        if (lastIsOper() == true) {
            setMathScrLast(''); }
        var screenTxt = screen.text();
        mathScreen = mathScreen.slice(0, -screenTxt.length);
        screen.text('');
    }

    $('#calc-ac').click(allClear);
    $('#calc-ce').click(clearLastEntry);
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

    setInterval(function() {
        $('#math-scr').text(mathScreen);
    },100);
});
