
AOS.init();

var i = 0;
var k = 0;
var j = 0;
var txt = 'Hello, I am';
var txt0 = 'RapydBot';
var txt1='You have just added ';
var speed = 70;
    
var timeInput = document.getElementById('timeId'); 
var timeR;
timeInput.addEventListener("change", function(){
timeR = document.getElementById('timeId').value; 

});
    

jQuery(function () {
      $(function () {
        $(window).scroll(function () { //Fonction appelée quand on descend la page
          if ($(this).scrollTop() > 200) {  // Quand on est à 200pixels du haut de page,
            $('.scrollUp').css('right', '10px'); // Replace à 10pixels de la droite l'image
          } else {
            $('.scrollUp').removeAttr('style'); // Enlève les attributs CSS affectés par javascript
          }
        });
      });
});

 
 

//RapydBot Modal Display Bot Btn
function displayBot()
{
document.getElementById('bot').classList.remove('chatbot--active')
}

function RemindBlock()
{

document.getElementById('ModalFirstAdd').style.display='block'
}

function RemindNone()
{
document.getElementById('ModalFirstAdd').style.display='none'
}

//RapydBot Modal Remind Btn
function RemindLater(timeLater)
{
if(timeLater==undefined | timeLater <0.005 )
{
alert('Add Correct Remind Time')
}
else
{


var timeInMinute = timeLater*60000;
const ModalRemindNone = setTimeout(RemindNone, 50);
const timeLaterRemind = setTimeout(RemindBlock, timeInMinute);
document.getElementById('timeId').value="";
displayBot()

}
}

//RapydBot Modal Order Btn
function Ordered()
{
const ModalRemindNone = setTimeout(RemindNone, 50);
chatbot.push()
}


//RapydBot Type Whritter
function typeWriter() 
{
if (i < txt.length | j < txt0.length |  k < txt1.length) {
document.getElementById("typeW").innerHTML += txt.charAt(i);
document.getElementById("typeW0").innerHTML += txt0.charAt(j);
document.getElementById("typeW1").innerHTML += txt1.charAt(k);
i++;
k++;
j++;
setTimeout(typeWriter, speed);
}
}


typeWriter()

//Button Clign
function urgencepanier(){
  var nombrePanier = document.querySelector('.paniero').textContent;
  var urgence = document.getElementById('urgent');


  if(nombrePanier >0){
    
    urgence.style.display='inline';

  }
}


urgencepanier();




window.addEventListener("click", function(event) {
 
  urgencepanier()
});


//Modal Game
function GameBlock()
    {
      
      document.getElementById('ModalGame').style.display='block'
    }

    function GameNone()
    {
      document.getElementById('ModalGame').style.display='none'
    }

