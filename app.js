var studentsList = [];
var equationsList = [];

var names = '';
var equ = '';
var filetext = '';

var equtionsFile = 'Equations.txt';
var listFile = 'List.txt';

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                filetext = allText;
            }
        }
    }
    rawFile.send(null);
}

readTextFile(equtionsFile);
equationsList = filetext.split('\n').sort();
readTextFile(listFile);
studentsList = filetext.split('\n').sort();
console.log(equationsList);
console.log(studentsList);


var couples = [];
var namesTable = document.getElementById('Names');
var equationsTable = document.getElementById('Equations');
var count = 0;
var duration = 3;
var maleDuration = 4.5;

for (var i = 0; i < studentsList.length; i++) {
    var newDiv = document.createElement('div');
    var newSpan = document.createElement('span');
    newDiv.className = 'names';
    newSpan.appendChild(document.createTextNode(studentsList[i]));
    newDiv.appendChild(newSpan);
    namesTable.appendChild(newDiv);
    namesTable.className = "maleTable";


}

for (var i = 0; i < equationsList.length; i++) {
    var newDiv = document.createElement('div');
    var newSpan = document.createElement('span');
    newDiv.className = 'names';
    newSpan.appendChild(document.createTextNode(equationsList[i]));
    newDiv.appendChild(newSpan);
    equationsTable.className = "femaleTable";
    equationsTable.appendChild(newDiv);

}

const nameEqu = function(name, equ) {
    this.name = name;
    this.equ = equ;
};

$('#start').click(function() {

    while (equationsList.length > 0 || namesTable.length > 0) {

        if (equationsList.length === 0 && namesTable.length >= 2) {
            var _firstFemale = equationsList[Math.floor(Math.random() * equationsList.length)];
            var secondeFemale = equationsList[Math.floor(Math.random() * equationsList.length)];
            couples.push(new nameEqu(_firstFemale, secondeFemale));
            equationsList.splice(equationsList.indexOf(_firstFemale), 1);
            equationsList.splice(equationsList.indexOf(secondeFemale), 1);
        } else {
            var firstMale = studentsList[Math.floor(Math.random() * studentsList.length)];
            var firstFemale = equationsList[Math.floor(Math.random() * equationsList.length)];
            couples.push(new nameEqu(firstMale, firstFemale));
            studentsList.splice(studentsList.indexOf(firstMale), 1);
            equationsList.splice(equationsList.indexOf(firstFemale), 1);
        }

    }

    $("#exampleModal").fadeOut(100);
    $('#container2').fadeOut(100);

    startLottery();


});

function startLottery() {
    $('#exampleModal').modal('hide');

    while (count < couples.length) {

        var coupleCard = document.createElement('div');
        coupleCard.className = 'row coupleCard center';
        var namesCard = document.createElement('div');
        namesCard.className = 'namesCard col-3 row';
        var femaleName = document.createElement('div');
        femaleName.className = 'femaleName col-9 center';
        var femaleNameSpan = document.createElement('span');
        femaleNameSpan.appendChild(document.createTextNode(couples[count].name));
        femaleName.appendChild(femaleNameSpan);
        namesCard.appendChild(femaleName);
        duration += .1;
        namesCard.style.animationDuration = duration + 's';
        coupleCard.appendChild(namesCard);


        var equCard = document.createElement('div');
        equCard.className = 'equCard col-3 row';
        var maleName = document.createElement('div');
        maleName.className = 'femaleName col-9 center';
        var maleNameSpan = document.createElement('span');
        maleNameSpan.appendChild(document.createTextNode(couples[count].equ));
        maleName.appendChild(maleNameSpan);
        equCard.appendChild(maleName);
        maleDuration += 0.1;
        equCard.style.animationDuration = maleDuration + 's';
        coupleCard.appendChild(equCard);
        document.getElementById('container3').appendChild(coupleCard);

        count = count + 1;
    }
}