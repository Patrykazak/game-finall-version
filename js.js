  
//load script when the rest of document is ready
$(document).ready(function(){

//all founctions for game sound
  function yeahCoin(){
        var audio = document.createElement("audio");
        audio.src = "coinSound.wav";
        audio.addEventListener("ended", function () {
            // document.removeChild(this);
            $(this).remove();
        }, false);
        audio.play();   
    }

    function invalid(){
        var audio = document.createElement("audio");
        audio.src = "invalid.wav";
        audio.addEventListener("ended", function () {
            // document.removeChild(this);
            $(this).remove();
        }, false);
        audio.play();   
    }

    function end(){
        var audio = document.createElement("audio");
        audio.src = "end.wav";
        audio.addEventListener("ended", function () {
            // document.removeChild(this);
            $(this).remove();
        }, false);
        audio.play();   
    }

    function soundStart(){
        var audio = document.createElement("audio");
        audio.src = "soundStart.wav";
        audio.addEventListener("ended", function () {
            // document.removeChild(this);
            $(this).remove();
        }, false);
        audio.play();   
    }

    function pressStart(){
        var audio = document.createElement("audio");
        audio.src = "pressStart.wav";
        audio.addEventListener("ended", function () {
            // document.removeChild(this);
            $(this).remove();
        }, false);
        audio.play();   
    }

    function hurryUp(){
        var audio = document.createElement("audio");
        audio.src = "hurryUp.wav";
        audio.addEventListener("ended", function () {
            // document.removeChild(this);
            $(this).remove();
        }, false);
        audio.play();   
    }

    // function yippee(){
    //     var audio = document.createElement("audio");
    //     audio.src = "yippee.wav";
    //     audio.addEventListener("ended", function () {
    //         document.removeChild(this);
    //     }, false);
    //     audio.play();   
    // }

    //play sound
    pressStart();

  //start the Game when click on Play button is performed
  $('#startGry').click(function(event){

    //play sound
    soundStart();
    $('#scoreLabel').css('font-size',"30vh")  //show score to original size
    $('#container').hide('slow');              //hide menu
    $('#timer').show('slow');                  //show timer
    $('#topscore').html(localStorage.getItem('maxscore')); //set maxscore to topscore div

    event.preventDefault();  //prevent default for event
    
    //start generating 10 objects per second
    var startInterval = setInterval(start,100);

    var speed = 5000; //holds time needed for object to fall all the way down to the bottom || lower = faster
    var score = 0;    //holds current score

    //refresh current score to our score div
    var wynikInterval = setInterval(function(){
      $('#scoreLabel').html(score);},10);

    
    var gameplayTime = 60; //how long should the gameplay last in sec
    countDown(); //<-----------------------------------------------------------------------
    var counter = setInterval(countDown, 1000); // loop countDown every second
    
    //main function for countdown Timer
    function countDown(){
      var out = gameplayTime;     //---------------       // out current decreaset time | gameplayTime fixed time
      if(gameplayTime==10){hurryUp();};
      if(gameplayTime<10) out = '0' + gameplayTime;         // if timer goes below 10 seconds set zero before 9 | 09 instead of 9
      $("#timer").html(out);      //---------------       // give id 'timer' current time to display
      if( gameplayTime <= 0){      
        gameplayTime=00;                                    // if gameplay time goes below 0 set it to 00, thats because red coin steals 3 second from timer

        //When Timer reaches 0 it means that the game should stop | we have to perform some actions

        clearInterval(wynikInterval)    //stop refreshing score to html id
        clearInterval(counter);         //stop time counting
        clearInterval(startInterval);   //stop generating new objects

        $('#container').show('slow');                       //show back menu
        $('[class^="obiekt"]').remove();                    //remove all objects with class starting with 'obiekt'
        $('#timer').hide('slow');                           //hide timer
        $('#scoreLabel').css("font-size", "20vh");         //resize score and show it above menu 
        end();  //play sound
   
           }
        --gameplayTime;   //decrease timer by 1 after 1 second
        };

    // main Function for generating objects and its behavior
    function start(){


    // increase falling speed according to score

            if (score<=50){speed=4500;}
      if (score>50&&score<=100){speed=4000;}
      if (score>100&&score<=150){speed=3500;}
      if (score>150&&score<=200){speed=3000;}
      if (score>200&&score<=250){speed=2500;}
      if (score>250&&score<=300){speed=2000;}
      if (score>300&&score<=350){speed=1500;}
      if (score>350&&score<=400){speed=1000;}

      //get user viewport Height and Width
      var wysokoscKlienta = window.innerHeight;
      var szerokoscKlienta = window.innerWidth;
      
      //generate random horizontal position for our object
      var x = Math.round(Math.random()*(szerokoscKlienta-100));

      //set vertical position 120px above the viewport
      var y = -120;

      // generating empty div
      var nowyDiv = document.createElement('div');

      // setting new div position
      nowyDiv.style.top=y+"px";
      nowyDiv.style.left=x+"px";

      // generating random number from 0 to 2
      var losoweCoiny = Math.round(Math.random()*2);

      // we give random class obiekt[0-2] to our empty object
      nowyDiv.className = 'obiekt'+losoweCoiny;

      // set id obiekt for all divs
      nowyDiv.id = 'obiekt';

      // attaching new personalized div to body
      document.body.appendChild(nowyDiv);
      
      // animate falling | speed = time in ms needed to fall from top to bottom | when it reaches bottom, function will delete the object
      $(nowyDiv).animate({top: "100vh"}, speed, 'linear', function(){
        nowyDiv.remove();
      });


      //main Function for removing objects by mouseover | score manipulation
      nowyDiv.addEventListener("mouseover", function removeCoin() {
        
        //dolar | red coin | avoid
        if(nowyDiv.className=='obiekt0'){
          nowyDiv.remove(nowyDiv);
          gameplayTime-=2; //steal 2 seconds from timer
          score-=5;
          invalid(); //play sound
        }

        //pound | orange coin | good
        if(nowyDiv.className=='obiekt1'){
          nowyDiv.remove(nowyDiv);
          score+=1;
          yeahCoin(); //play sound
        }

        //euro | green coin | best
        if(nowyDiv.className=='obiekt2'){
          nowyDiv.remove(nowyDiv);
          score+=2;
        yeahCoin(); //play sound
      }


        // localStorage.getItem('maxscore');
        if (score>localStorage.getItem('maxscore')){
          localStorage.setItem('maxscore',score); //if current score > maxscore, set new maxscore to localStorage
          // yippee();
          $('#topscore').html(score); //append new topscore to topscore div
        } 
        else {
          $('#topscore').html(localStorage.getItem('maxscore')); //if score < maxscore show old maxscore in topscore div
        }

      }); //removeCoin end
    } //start end
  }); //click event end on Play button
}); //document ready end




