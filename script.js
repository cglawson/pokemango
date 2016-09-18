 $(document).ready(function() {

     // SOUNDS

     /*
		AlaskaRobotics
		Creative Commons
		http://www.freesound.org/people/AlaskaRobotics/sounds/221091/
	*/
     var pop = new Howl({
         src: ['./sounds/pop.webm', './sounds/pop.ogg', './sounds/pop.mp3']
     });

     /*
		sethlind
		Creative Commons
		https://www.freesound.org/people/sethlind/sounds/265012/
	*/
     var ding = new Howl({
         src: ['./sounds/ding.webm', './sounds/ding.ogg', './sounds/ding.mp3']
     });

     /*
		Steven O'Brien
		Creative Commons
		https://soundcloud.com/stevenobrien/sega-genesismegadrive-boss-battle-ish-chiptune
	*/
     var music = new Howl({
         src: ['./sounds/music.ogg', './sounds/music.mp3'],
         loop: true
     });

     // BROWSER DETECTION

     var isInternetExplorer = function isInternetExplorer() {
         var ua = window.navigator.userAgent;

         if (ua.indexOf('MSIE ') >= 0) {
             return true;
         } else if (ua.indexOf('Trident/') >= 0) {
             return true;
         } else if (ua.indexOf('Edge/') >= 0) {
             return true;
         } else {
             return false;
         }
     }

     var isMobileOrDesktop = function isMobileOrDesktop() {
         //Force pre-load of sounds
         pop.load();
         ding.load();
         music.load();

         if ($(window).width() <= 800) { //mobile
             return true;
         } else { //desktop
             return false;
         }
     }

     // GLOBAL VARIABLES

     // pokecount local storage
     var pokecount = 0;
     if (typeof(Storage) !== "undefined") {
         if (localStorage.pokecount) {
             //Retrieve
             pokecount = Number(localStorage.pokecount);
             //Display
             $("#pokecount").text(pokecount)
         }
     }

     // detect browser
     var terribleBrowser = isInternetExplorer();

     // detect mobile or desktop
     var mobile = isMobileOrDesktop();

     // used for banner
     var encouragements = ["Amazing!", "Awesome!", "Beautiful!",
         "Brilliant!", "Exquisite!", "Great!", "Outrageous!", "Fabulous!", "Impressive!", "Nice!", "Splendid!", "Stellar!", "Superb!", "Terrific!"
     ];
     var colors = ["SpringGreen", "Black", "Fuchsia", "Turquoise", "Indigo", "Violet", "CornflowerBlue"];
     var inTransitions = ["bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "lightSpeedIn", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "rollIn", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "slideInDown", "slideInLeft", "slideInRight", "slideInUp"];
     var outTransitions = ["bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "lightSpeedOut", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "rollOut", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp"];

     var lastpoketime;
     var totalpoketime = 1000;
     var avgpoketime = 1000;

     // UTILITY FUNCTIONS

     var animateElement = function animateElement(element, prevanimation, animation) {
         $(element).removeClass("animated " + prevanimation);

         setTimeout(function() {
             $(element).addClass("animated " + animation);
         }, 50);
     };

     var animateBanner = function animateBanner() {
         var inTransition = inTransitions[Math.floor(Math.random() * inTransitions.length)];
         var outTransition = outTransitions[Math.floor(Math.random() * outTransitions.length)];

         $("#textanchor").append("<div id='textbanner' class='animated " + inTransition + "'" + "style='color:" + colors[Math.floor(Math.random() * colors.length)] + "'>" + encouragements[Math.floor(Math.random() * encouragements.length)] + "</div>");

         setTimeout(function() {
             animateElement("#textbanner", inTransition, outTransition);
             setTimeout(function() {
                 $("#textbanner").remove();
             }, 2250);
         }, 1250);
     };

     $(window).resize(function() { //If the screen is resized
         $("#poker").css("left", "");
         $("#poker").css("top", "");

         mobile = isMobileOrDesktop();
     });

     // COMMENCE THE CLICKENING

     $("#mango").click(function() {
         //Get current time
         var currentpoketime = new Date().getTime().valueOf();

         //Increase the mango
         $("#pokecount").text(++pokecount);

         //Persist the pokecount
         if (typeof(Storage) !== "undefined") {
             localStorage.pokecount = pokecount;
         }

         //Animate the mango and counter
         if (typeof(lastpoketime) !== 'undefined') {
             totalpoketime = currentpoketime - lastpoketime;
             avgpoketime = (avgpoketime + totalpoketime) / 2;
         }

         if (avgpoketime < 150) {
             $("#pokecount").css("color", "red");
             if (!music.playing()) {
                 music.fade(0.0, 1.0, 750);
                 music.play();
             } else {
                 if (!terribleBrowser) {
                     music.rate(1.5);
                 }
             }
         } else if (avgpoketime < 250) {
             $("#pokecount").css("color", "orange");
             if (!music.playing()) {
                 music.fade(0.0, 1.0, 750);
                 music.play();
             } else {
                 if (!terribleBrowser) {
                     music.rate(1.15);
                 }
             }
         } else if (avgpoketime < 500) {
             $("#pokecount").css("color", "gold");
             if (!music.playing()) {
                 music.fade(0.0, 1.0, 750);
                 music.play();
             }
         } else {
             $("#pokecount").css("color", "");
             if (music.playing()) {
                 if (terribleBrowser) {
                     music.rate(1.0);
                 } else {
                     music.rate(0.8);
                 }

                 music.fade(1.0, 0.0, 500);
                 setTimeout(function() {

                     music.pause();
                 }, 500);
             }
         }

         if (!mobile && totalpoketime > 200) {
             animateElement("#mango", "jello", "jello");
         } else if (mobile && totalpoketime > 400) {
             animateElement("#mango", "jello", "jello");
         }

         if (pokecount % 10 === 0) {
             animateElement("#pokecount", "tada", "tada");
             ding.play();
         } else {
             pop.play();
         }

         //banner animation
         if (pokecount % 25 === 0) {
             animateBanner();
         }

         //If maximum count reached
         if (pokecount == Math.pow(2, 53) - 1) {
             animateElement("#pokecount", "tada", "hinge");
             pokecount = 0;
         }

         //Animate the poker
         if (mobile) {
             $("#poker").css("top", "60px");

             setTimeout(function() {
                 $("#poker").css("top", "100px");
             }, 100);
         } else { //desktop
             $("#poker").css("left", "-290px");

             setTimeout(function() {
                 $("#poker").css("left", "-330px");
             }, 100);
         }

         //Set current time to previous
         lastpoketime = currentpoketime;

     });

     // SPACE POKE TRIGGER
     $('body').keyup(function(e) {
         if (e.keyCode == 32) {
             $("#mango").click();
         }
     });

     // RESET POKECOUNT
     $("#pokecount").click(function() {
         //stop the music and make score black
         music.fade(1.0, 0.0, 100);
         $("#pokecount").css("color", "black");

         var reset = confirm("Do you really want to reset your poke count?");

         if (reset == true) {
             //reset poke count
             pokecount = 0;
             //persist to local storage
             if (typeof(Storage) !== "undefined") {
                 localStorage.pokecount = pokecount;
             }
             //display
             $("#pokecount").text(pokecount);
         }
     });
 });
