$(document).ready(function () {
  //fallback for safari as it doesn't support vh
  if (
    navigator.userAgent.search("Safari") >= 0 &&
    navigator.userAgent.search("Chrome") < 0
  ) {
    $(".game").height($(window).height() * 0.9);
  }

  var cards = [
    "piggy-bank",
    "shoe",
    "plane",
    "suitcase",
    "robot",
    "ring",
    "palm-tree",
    "mp3",
  ];
  var pairs = cards.concat(cards); //create pairs of cards
  var chosenCards = [];
  var cardsToFlip = [];

  var gameStarted = false;
  var running = false;
  var outOfTime = false;
  var countdownStarted = false;
  var win = false;
  var pairCount = 0;
  var time = 30;

  shuffleArray(pairs); //shuffle cards

  $(".back").each(function (i, element) {
    $(this).attr("id", pairs[i]); //sets id in DOM for cards, access styles via css
  });

  $(".flip-container").click(function () {
    if (!outOfTime) {
      if (!gameStarted && !running) {
        //before the game starts, show all cards to the user and flip back

        running = true;

        $(".flip-container").each(function () {
          $(this).toggleClass("flip");
        });

        setTimeout(function () {
          $(".flip-container").each(function () {
            $(this).toggleClass("flip");
          });

          gameStarted = true;
          running = false;
        }, 2000);
      } else if (
        $(this).find(".back").attr("id") == chosenCards[0] &&
        chosenCards[1] == null &&
        $(this).hasClass("flip") &&
        !running
      ) {
        running = true;

        chosenCards[0] = null; //if one card has been chosen and then clicked again, flip back over
        $(this).toggleClass("flip");

        running = false;
      } else if ($(this).hasClass("flip")) {
        return; //if the card clicked is already flipped, return
      } else if (
        chosenCards[0] == null &&
        chosenCards[1] == null &&
        !$(this).hasClass("flip") &&
        !running
      ) {
        if (!countdownStarted) {
          countdown();
        }

        running = true;

        chosenCards[0] = $(this).find(".back").attr("id"); //if no cards have been chosen, store the chosen card's in chosenCards[0]
        $(this).toggleClass("flip");

        running = false;
      } else if (
        chosenCards[0] != null &&
        chosenCards[1] == null &&
        !$(this).hasClass("flip") &&
        !running
      ) {
        running = true;

        chosenCards[1] = $(this).find(".back").attr("id"); //if no second card has been flipped, store the chosen card's brand in chosenCards[1] and flip it
        $(this).toggleClass("flip");

        if (chosenCards[0] == chosenCards[1]) {
          chosenCards[0] = null;
          chosenCards[1] = null;

          pairCount++;

          if (pairCount == cards.length) {
            win = true;
            alert("you win :D");
            window.location.reload();
          }

          running = false;
        } else {
          //if the brands did not match - empty the chosenCards & flip the cards back over

          cardsToFlip[0] = chosenCards[0];
          cardsToFlip[1] = chosenCards[1];

          chosenCards[0] = null;
          chosenCards[1] = null;

          setTimeout(function () {
            //flip back the chosen cards that did not match

            $("*[id*=" + cardsToFlip[0] + "]").each(function () {
              $(this).closest(".flip").toggleClass("flip");
            });
            $("*[id*=" + cardsToFlip[1] + "]").each(function () {
              $(this).closest(".flip").toggleClass("flip");
            });

            running = false;
          }, 800);
        }
      }
    } else {
      alert("you have run out of time :(");
      window.location.reload();
    }
  }); //Flip Container Click End

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }



  function countdown() {
    countdownStarted = true;

    var timeStart = +new Date();
    var timer = setInterval(function () {
      var timeNow = +new Date();
      var difference = (timeNow - timeStart) / 1000; //calculates time difference if game isn't in focus

      if (time > 0 && !win) {
        // if there is still time left and game isn't won, deduct time

        time = 30;
        time = Math.floor(time - difference);
        $(".timer").text(time);
      } else if (win) {
        //stop timer when game is won

        clearInterval(timer);
      } else {
        //stop timer when time is run out

        outOfTime = true;
        alert("you have run out of time :(");
        window.location.reload();

        clearInterval(timer);
      }
    }, 250);
  }

  // codes
  setTimeout(() => {
    $("#splash-screen").hide();
  }, 5000); // set time to show splash screen

  gsap.to("#splash-img", { duration: 4.5, scale: 40 });
});


var container = document.querySelector('.parallax-container');
var base = document.querySelector('.parallax-base');


cssParallax(container, base, 20);

function cssParallax(cont, el, radiusVal){
  cont.addEventListener('mousemove', function(event) {
        
     var x = window.innerWidth;
      var y = window.innerHeight;
    
      cx = Math.ceil(x / 2.0);
      cy = Math.ceil(y / 2.0);
      dx = event.pageX - cx;
      dy = event.pageY - cy;
      
      tiltx = (dy / cy)*0.1;
      tilty = - (dx / cx)*0.3; 

      radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
      degree = (radius * radiusVal);

      el.style.transform = 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)';
  });
}





    function onDeviceMotion(event) {
      rotateForce = 10; // max popup rotation in deg
     

      var docX = window.innerWidth;
      var docY = window.innerHeight;

      var accelX = event.beta;  
      var accelY = event.gamma; 
 
      base.style.transform='rotateX(' + accelX + 'deg' + ') rotateY(' + accelY + 'deg' + ')';
    };
    window.addEventListener('deviceorientation', onDeviceMotion, false);
 



var basicTimeline = anime.timeline({ 
  loop: true
});
var dauer = 400;
basicTimeline
  .add({
   targets: '#flash_1',
  opacity:[0, 1, 0, 1, 0],
  translateX: function() { return anime.random(-30, 150); },
  duration: dauer,
  offset: 5700
  })
.add({
   targets: '.lines',
  stroke:[
    {value: '#000'}, 
    {value: '#f00'}, 
    {value: '#000'}, 
    {value: '#f00'}, 
    {value: '#000'}, 
    
  ],
  duration: dauer,
  offset: '-=400'
  })
.add({
   targets: '.stones',
  fill:[
    {value: '#000'}, 
    {value: '#555'}, 
    {value: '#000'}, 
    {value: '#555'}, 
    {value: '#000'}, 
    
  ],
  duration:dauer,
  offset: '-=400'
  })
  .add({
     targets: '#flash_2',
  opacity:[0, 1, 0, 1, 0],
  translateX: function() { return anime.random(-30, 150); },
  duration:dauer,
  offset: 7700
  })
.add({
   targets: '.lines',
  stroke:[
    {value: '#000'}, 
    {value: '#f00'}, 
    {value: '#000'}, 
    {value: '#f00'}, 
    {value: '#000'}, 
    
  ],
  duration:dauer,
  offset: '-=400'
  })
.add({
   targets: '.stones',
  fill:[
    {value: '#000'}, 
    {value: '#555'}, 
    {value: '#000'}, 
    {value: '#555'}, 
    {value: '#000'}, 
    
  ],
  duration:dauer,
  offset: '-=400'
  })
.add({
     targets: 'text',
  opacity:[0, 1, 0, 1, 0],
    duration:dauer+1000,
  offset:  '-=400'
  })
;


