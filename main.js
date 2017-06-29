(function () {
for(var i=1; i<=3; i++){//buttons for calling calculators

    var button= "button"+i; 
    var to= document.getElementById(button);
    to.addEventListener('click',start);    

}


function start(){
    var tip=this.getAttribute("data-type");//which calculator to open
   
        DG.newCalc(tip);

 
        
    }

}());

var DG = (function () {
    var API = {},
        activeCalculator = [],
        calculatorTemplate =

        '<div class="calc-wrapper" data-calculatorID="{{calculatorID}}">' +
        '<div id="wrapp">'+
        '<div class="screen" id="screen-{{calculatorID}}">' +
        '<span class="screen1" id="screen1-{{calculatorID}}">' +
        '</span>' +
        '</div>' +
        '<div class="btnDIV" id="btnDIV-{{calculatorID}}">' +
        '<button class="btnCE" id="btnCE-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="reset">' + 'CE' + '</button>' +
        '<button class="btnDEL" id="btnDEL-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="delete">' + 'DEL' + '</button>' + '<br/>' +


        '<button class="btn" id="btn7-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="7">' + '7' + '</button>' +
        '<button class="btn" id="btn8-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="8">' + '8' + '</button>' +
        '<button class="btn" id="btn9-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="9">' + '9' + '</button>' +
        '<button class="btn" id="btn10-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="/">' + '/' + '</button>' + '<br/>' +

        '<button class="btn" id="btn4-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="4">' + '4' + '</button>' +
        '<button class="btn" id="btn5-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="5">' + '5' + '</button>' +
        '<button class="btn" id="btn6-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="6">' + '6' + '</button>' +
        '<button class="btn" id="btn11-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="*">' + 'x' + '</button>' + '<br/>' +

        '<button class="btn" id="btn1-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="1">' + '1' + '</button>' +
        '<button class="btn" id="btn2-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="2">' + '2' + '</button>' +
        '<button class="btn" id="btn3-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="3">' + '3' + '</button>' +
        '<button class="btn" id="btn12-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="+">' + '+' + '</button>' + '<br/>' +

        '<button class="btn" id="btn13-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types=".">' + '.' + '</button>' +
        '<button class="btn" id="btn0-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="0">' + '0' + '</button>' +
        '<button class="btn" id="btn14-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="-">' + '-' + '</button>' +
        '<button class="btnEQ" id="btnJED-{{calculatorID}}" data-calculatorID="{{calculatorID}}" data-types="result">' + '=' + '</button>' +
        '</div>'+
       
        '</div>' +
        '</div>';

    //push input values in to array, join them and shows on the calculator screen

    function input() {
        var calculatorID = this.getAttribute("data-calculatorID"),
            calc = activeCalculator[calculatorID],
            x,
            z;

        x = this.getAttribute("data-types");
        calc.inputArray.push(x);
        
        if((typeof calc.inputArray[0]==='number') && isNaN(calc.inputArray[1])===false){
            calc.inputArray.length=0;
            calc.inputArray.push(x);
           }
        
        calc.z = calc.inputArray.join("");
        calc.screen1.innerHTML = calc.z;
 

    }


//take string, eval string and show result on the screen
    function result() {
        var calculatorID = this.getAttribute("data-calculatorID"),
            calc = activeCalculator[calculatorID];
        var rez = eval(calc.z); 
        calc.screen1.innerHTML = rez;
        calc.inputArray.length = 0;//emptying array
        calc.inputArray.push(rez);//push himself into array


    }

    //delete input
    function del() {
        var calculatorID = this.getAttribute("data-calculatorID"),
            calc = activeCalculator[calculatorID];
        calc.inputArray.pop();
        z = calc.inputArray.join("");
        calc.screen1.innerHTML = z;


    }

    //reset calculator
    function reload() {
        var calculatorID = this.getAttribute("data-calculatorID"),
            calc = activeCalculator[calculatorID];
        calc.inputArray.length = 0;
        calc.screen1.innerHTML = "";
        
    }


    // api
    API.newCalc = function (wrap) {
        var container = document.getElementById(wrap),
            calculatorID;

        if (!container) {
            alert('Wrong container ID sent!');
            return;
        }

        activeCalculator.push({ //object for all neccesary variables, events,objects...
            z: '',
            screen1: '', 
            buttons: {},
            inputArray: [], 
            btnCE: '',
            btnDEL: '',
            btnJED: '',
            screen1: ''

        });

        calculatorID = activeCalculator.length - 1; //how many calculators is possible
        
        container.innerHTML = calculatorTemplate.replace(/{{calculatorID}}/g, calculatorID);


        for (let i = 0; i <= 14; i++) {//button constructor

            activeCalculator[calculatorID].buttons[i] = document.getElementById("btn" + i + "-" + calculatorID);
            activeCalculator[calculatorID].buttons[i].addEventListener('click', input);

        }
        activeCalculator[calculatorID].btnCE = document.getElementById("btnCE-" + calculatorID);

        activeCalculator[calculatorID].btnCE.addEventListener('click', reload);

        activeCalculator[calculatorID].btnDEL = document.getElementById("btnDEL-" + calculatorID);

        activeCalculator[calculatorID].btnDEL.addEventListener('click', del);

        activeCalculator[calculatorID].btnJED = document.getElementById("btnJED-" + calculatorID);

        activeCalculator[calculatorID].btnJED.addEventListener('click', result);

        activeCalculator[calculatorID].screen1 = document.getElementById("screen1-" + calculatorID); //place for showing results



    };


    return API;
}());
