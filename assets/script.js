// light/dark mode toggle - saves in local storage for refresh
// local storage code copied and amended from css-tricks.com
// https://css-tricks.com/a-complete-guide
// -to-dark-mode-on-the-web/#storing-preferences
const currentTheme = localStorage.getItem("theme");
const toggleButton = localStorage.getItem("button");

if (currentTheme == "dark") {
  // ...then use the .dark-theme class
  $(".light").addClass("dark");
}

if (toggleButton == "light") {
  $("#light-dark-toggle").addClass("toggle-light");
}

// Listen for a click on the button
$("#light-dark-toggle").click(function () {
  // Toggle the .dark-theme class on each click
  $(".light").toggleClass("dark");

  // Let's say the theme is equal to light
  let theme = "light";

  // If the body contains the .dark-theme class...
  if ($(".light").hasClass("dark")) {
    // ...then let's make the theme dark
    theme = "dark";
  }
  // Then save the choice in localStorage
  localStorage.setItem("theme", theme);

  // toggles class on toggle button
  $(this).toggleClass("toggle-light");

  let button = "dark";

  if ($(this).hasClass("toggle-light")) {
    button = "light";
  }

  localStorage.setItem("button", button);
});

// navbar toggle
$("#hamburger").click(function () {
  // flips hamburger 90 degrees
  $(this).toggleClass("flip");
  // toggles navbar visibility
  $(".nav").toggleClass("visible");
  // toggles main content width to fit navbar
  $("main").toggleClass("shrink");
});

// closes navbar after picking section
$(".section-link").click(function () {
  // flips hamburger back to original state
  $("#hamburger").toggleClass("flip");
  // closes navbar
  $(".nav").toggleClass("visible");
  // expands main content to fill window again
  $("main").toggleClass("shrink");
});

// toggles display of workout instructions
$(".toggle-trigger").click(function () {
  // toggles inner content of the list item
  $(this).toggleClass("active").next().slideToggle("slow");
  // toggles border colour of list item
  $(this).parent().toggleClass("green");
});

// pushes each item in myWorkout list to the exercises array
function getExercises() {
  // empty exercises array
  exercises = [];
  // defines all exercises as added in the DOM and cycles through them
  // to add to the exercises array
  let allExercises = document.querySelectorAll(".activity");
  allExercises.forEach((exercise) => {
    exercises.push(exercise.innerText);
  });
}

// refreshes local storage by taking the current
// data from the DOM every time this is run
function addLocalExercises() {
  // gets all exercises in DOM and pushes to array
  getExercises();
  // adds each exercise on the exercises array to local storage JSON string
  let savedExercises = Object.assign({}, exercises);
  localStorage.setItem("exercises", JSON.stringify(savedExercises));
}

// adding custom items to workout list
// code copied and adapted from Udemy Course
// 'Modern Javascript: From Novice to Ninja' - Author: Shaun Pelling

const addExercise = document.querySelector(".exercise-form");
const list = document.querySelector("#workout-list");

// gets exercises from local storage
function getLocalExercises() {
  // gets locally stored exercises
  const stored = localStorage.getItem("exercises");
  // parses JSON data to object
  let data = JSON.parse(stored);
  // for each value in object, pushes this to the DOM
  $.each(data, function (i, val) {
    const html = `
    <li class="exercise">
      <span class="activity">${val}</span>
      <i class="fas fa-trash-alt delete"></i>
    </li>
  `;
    list.innerHTML += html;
  });
}

// runs every time the page is refreshed and returns local storage
getLocalExercises();

// creates template literal for exercises added to list
const template = (exercise) => {
  const html = `
    <li class="exercise">
      <span class="activity">${exercise}</span>
      <i class="fas fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
};

// adds content of box to workout list upon submit
// values are trimmed to show only text content to remove any whitespace
addExercise.addEventListener("submit", (e) => {
  // prevents default submit action
  e.preventDefault();
  // gets value of input box and trims any empty space
  let exercise = addExercise.add.value.trim();
  // if input has content then pushes the value to the workout list
  if (exercise.length) {
    // creates template literal
    template(exercise);
    // checks colour for visual input validation colour change
    startColour();
    // adds to local storage
    addLocalExercises();
    // resets input box
    addExercise.reset();
    // if input has no content then triggers negative toast
  } else {
    $("#toast").html(`
    <div class ="negative">
      <p>No Text Entered!!</i></p>
    </div>
    `);
    $("#toast").show();
    // times toast out after 6 seconds
    setTimeout(function () {
      $("#toast").hide();
      $("#toast").html(``);
    }, 6000);
  }
});

// adds existing exercises to workout list
$(".workout-add").click(function () {
  let exercise = $(this).parent().prev().text();
  // create template literal
  const html = `
    <li class="exercise">
      <span class="activity">${exercise}</span>
      <i class="fas fa-trash-alt delete light"></i>
    </li>
  `;
  // pushes template literal to DOM
  list.innerHTML += html;
  // checks colour for visual input validation colour change
  startColour();
  // adds to local storage
  addLocalExercises();
  $(this).css({
    background: "#33C173",
  });
  let x = $(this);
  // toggles appearance of exercise instructions after submitting
  setTimeout(function () {
    $(x).parent().prev().toggleClass("active");
    $(x).parent().slideToggle("slow");
    $(x).parent().parent().toggleClass("green");
    $(x).css({
      background: "#f5f5f5",
    });
  }, 1000);
});

// deletes items from workout list
$("#workout-list").click(function (e) {
  // checks for class 'delete' so it only targets the trashcan icon
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
  // checks colour for visual input validation colour change
  startColour();
  // deletes from local storage
  addLocalExercises();
});

// checks if there are any exercises in the workout
// and switches colour of start button depending
function startColour() {
  getExercises();
  if (exercises.length) {
    $("#start-workout").removeClass("red-button");
  } else {
    $("#start-workout").addClass("red-button");
  }
}

// checks automatically upon page load if there are items on the workout list
startColour();

// toggles sound on and off
function toggleSound() {
  $("#sound").click(function () {
    // checks whether sound is currently muted or not
    // if sound is currently on
    if ($(this).children([0]).hasClass("fa-volume-up")) {
      // this section is needed for the first
      // modal pop up as this does not refresh
      $(this).children([0]).removeClass("fa-volume-up");
      $(this).children([0]).addClass("fa-volume-mute");
      // changes value of 'on' variable when sound is switched off
      on = false;
      // this changes the value of variable 'sound' every time, so that it
      // stays the same every time the modal refreshes on 'set interval'
      sound = `
        <div class="modal-icon" id="sound">
          <i class="fas fa-volume-mute"></i>
        </div>
      `;
      z = "off";
      // if sound is currently muted
    } else {
      $(this).children([0]).removeClass("fa-volume-mute");
      $(this).children([0]).addClass("fa-volume-up");
      // returns 'on' variable to true when sound is on
      on = true;
      sound = `
        <div class="modal-icon" id="sound">
          <i class="fas fa-volume-up"></i><
        /div>
      `;
      // this changes the value of variable 'sound' every time, so that it
      // stays the same every time the modal refreshes on 'set interval'
      z = "on";
    }
    // sets local storage based on above code so this always matches dom content
    localStorage.setItem("sound", z);
  });
}

// general workout timer function

// this loops through each item in the
// exercises array until workout is complete
let startWorkout = function (sec1, sec2) {
  // removes first exercise from array
  let removeFirstExercise = function () {
    exercises.shift();
  };

  // gets width of container
  let width = $(".modal-content").width();

  // when user starts workout, timer function is activated
  // giving 15 seconds before workout begins
  let countDown = function () {
    let sec = 15;
    let sec3 = 15;
    let timer3 = setInterval(function () {
      $(".modal-content").html(`
        ${sound}
        <div id="close-modal" class="modal-icon">
          <i class="fas fa-times"></i>
        </div>
        <p class="modal-heading">Get Ready...</p>
        <div class="timer">
          <p class="timerdisplay">${sec}</p>
        </div>
        <div class="progress"></div>
      `);
      sec--;
      // sound toggle
      toggleSound();
      // closes modal
      $("#close-modal").click(function () {
        $("#exercise-modal").hide();
        clearInterval(timer3);
      });
      // reduces width of progress bar as timer ticks down
      let progWidth = ((sec + 1) * width) / sec3;
      $(".progress").css({
        width: progWidth + "px",
      });
      // changes colours within modal box in
      // traffic light pattern as timer ticks down
      // changes to 'amber'
      if (sec < 10) {
        $(".timer").css({
          background: "#ffa630",
        });
        $(".progress").css({
          background: "#ffa630",
        });
        $(".modal-content").css({
          border: "2.5px solid #ffa630",
        });
      }
      // changes to 'red'
      if (sec < 5) {
        $(".timer").css({
          background: "#d53910",
        });
        $(".progress").css({
          background: "#d53910",
        });
        $(".modal-content").css({
          border: "2.5px solid #d53910",
        });
      }
      // plays sound when timer is at 10 and 5 seconds remaining
      if (sec == 4 || sec == 9) {
        if (on) {
          $("#ding")[0].play();
        }
      }
      // activates once timer elapses
      if (sec < 0) {
        // stops timer
        clearInterval(timer3);
        // plays sound effect
        if (on) {
          $("#buzz")[0].play();
        }
        setTimeout(function () {
          // changes inner colours back to green for next section
          $(".modal-content").css({
            border: "2.5px solid #33C173",
          });
          // activates timer for first exercise in list
          timer(sec1);
        }, 1000);
      }
    }, 1000);
  };

  // triggers countdown function
  countDown();

  // timer for each exercise
  let timer = function () {
    // takes first item in exercises array
    let x = exercises[0];
    let sec = sec1;
    let timer1 = setInterval(function () {
      $(".modal-content").html(`
        ${sound}
        <div id="close-modal" class="modal-icon">
          <i class="fas fa-times"></i>
        </div>
        <p class="modal-heading">${x}</p>
        <div class="timer">
          <p class="timerdisplay">${sec}</p>
        </div>
        <div class="progress"></div>
      `);
      sec--;
      // sound toggle
      toggleSound();
      // closes modal
      $("#close-modal").click(function () {
        $("#exercise-modal").hide();
        clearInterval(timer1);
      });
      // reduces width of progress bar as timer ticks down
      let progWidth = ((sec + 1) * width) / sec1;
      $(".progress").css({
        width: progWidth + "px",
      });
      // changes colours within modal box in
      // traffic light pattern as timer ticks down
      // changes to 'amber'
      if (sec < 20) {
        $(".timer").css({
          background: "#ffa630",
        });
        $(".progress").css({
          background: "#ffa630",
        });
        $(".modal-content").css({
          border: "2.5px solid #ffa630",
        });
      }
      // changes to 'red'
      if (sec < 10) {
        $(".timer").css({
          background: "#d53910",
        });
        $(".progress").css({
          background: "#d53910",
        });
        $(".modal-content").css({
          border: "2.5px solid #d53910",
        });
      }
      // plays sound when timer is at 20 and 10 seconds remaining
      if (sec == 9 || sec == 19) {
        if (on) {
          $("#ding")[0].play();
        }
      }
      // activates once timer elapses
      if (sec < 0) {
        // stops timer
        clearInterval(timer1);
        // removes first exercise from exercises array
        removeFirstExercise();
        // if exercises array is now empty,
        // congratulations is trigged, ending the workout
        if (exercises.length == 0) {
          if (on) {
            $("#cheer")[0].play();
          }
          setTimeout(function () {
            congratulations();
            $(".modal-content").css({
              border: "2.5px solid #33C173",
            });
          }, 1000);
          // if exercises array has items remaining, triggers restTimer function
        } else {
          if (on) {
            $("#buzz")[0].play();
          }
          setTimeout(function () {
            $(".modal-content").css({
              border: "2.5px solid #33C173",
            });
            restTimer(sec2);
          }, 1000);
        }
      }
    }, 1000);
  };

  // timer for rest period between exercises
  let restTimer = function () {
    let sec = sec2;
    let x = exercises[0];
    let timer2 = setInterval(function () {
      $(".modal-content").html(`
        ${sound}
        <div id="close-modal" class="modal-icon">
          <i class="fas fa-times"></i>
        </div>
        <p class="modal-heading">Rest!<br>Next Exercise: ${x}</p>
        <div class="timer">
          <p class="timerdisplay">${sec}</p>
        </div>
        <div class="progress"></div>
      `);
      sec--;
      // sound toggle
      toggleSound();
      // closes modal
      $("#close-modal").click(function () {
        $("#exercise-modal").hide();
        clearInterval(timer2);
      });
      // reduces width of progress bar as timer ticks down
      let progWidth = ((sec + 1) * width) / sec2;
      $(".progress").css({
        width: progWidth + "px",
      });
      // changes colours within modal box in
      // traffic light pattern as timer ticks down
      // changes to 'amber'
      if (sec < 20) {
        $(".timer").css({
          background: "#ffa630",
        });
        $(".progress").css({
          background: "#ffa630",
        });
        $(".modal-content").css({
          border: "2.5px solid #ffa630",
        });
      }
      // changes to 'red'
      if (sec < 10) {
        $(".timer").css({
          background: "#d53910",
        });
        $(".progress").css({
          background: "#d53910",
        });
        $(".modal-content").css({
          border: "2.5px solid #d53910",
        });
      }
      // plays sound when timer is at 20 and 10 seconds remaining
      if (sec == 9 || sec == 19) {
        if (on) {
          $("#ding")[0].play();
        }
      }
      // activates once timer elapses
      if (sec < 0) {
        // stops timer
        clearInterval(timer2);
        if (on) {
          $("#buzz")[0].play();
        }
        setTimeout(function () {
          $(".modal-content").css({
            border: "2.5px solid #33C173",
          });
          // starts timer for first exercise in array
          timer(sec1);
        }, 1000);
      }
    }, 1000);
  };

  // congratulations message when workout is complete
  let congratulations = () => {
    $(".modal-content").html(`
      <div id="close-modal" class="modal-icon">
        <i class="fas fa-times"></i>
      </div>
      <h3>Congratulations!</h3>
      <p>Workout Complete</p>
      <div class="complete-img-div">
        <img src="assets/images/champagne.png"
        alt="champagne" class="complete-img">
      </div>
      <div class="social">
        <p>Share to social media!!</p>
        <a href="https://www.facebook.com/" target="_blank">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://www.twitter.com/" target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    `);
    $("#close-modal").click(function () {
      $("#exercise-modal").hide();
    });
  };
};

// if there are no exercises on the workout
function noExercises() {
  // negative toast appears
  $("#toast").html(`
    <div class ="negative">
      <p>No Exercises in List!!</i></p>
    </div>
  `);
  $("#toast").show();
  // toast times out after 6 seconds
  setTimeout(function () {
    $("#toast").hide();
    $("#toast").html(``);
  }, 6000);
}

// if user selects custom workout difficulty
function customOpen() {
  $(".modal-content").html(`
  ${sound}
    <div id="close-modal" class="modal-icon">
      <i class="fas fa-times"></i>
    </div>
    <div class="times-div">
      <div>
        <label for="exercise-time" aria-label="exercise time"></label>
        <input class="custom-number red-input" id="exercise-time" type="number" placeholder="Exercise (s)">
      </div>
      <div>
        <label for="rest-time" aria-label="rest time"></label>
        <input class="custom-number red-input" id="rest-time" type="number" placeholder="Rest (s)">
      </div>
      <div class="custom-buttons-div">
        <button class="my-button modal-button red-button" id="start">Start!</button>
        <button class="my-button modal-button red-button" id="back">Back</button>
      </div>
    </div>
  `);
  // adds validation to custom number inputs
  const inputs = document.querySelectorAll(".custom-number");
  inputs.forEach((input) => {
    formColour(input);
  });
  // toggles sound
  toggleSound();
  // closes modal
  $("#close-modal").click(function () {
    $("#exercise-modal").hide();
  });
  // starts workout based on custom times
  $("#start").click(function () {
    let x = $("#exercise-time").val();
    let y = $("#rest-time").val();
    if (x.length && y.length) {
      setTimeout(function () {
        startWorkout(x, y);
      }, 200);
    } else {
      // if user has entered no numbers to custom workout
      $("#toast").html(`
      <div class ="negative">
      <p>No Times Selected!!</i></p>
      </div>
    `);
      $("#toast").show();
      setTimeout(function () {
        $("#toast").hide();
        $("#toast").html(``);
      }, 6000);
    }
  });
  $("#back").click(function () {
    workoutStart();
  });
}

//opens first modal screen difficulty select
let workoutStart = function () {
  // gets array of exercises on workout
  getExercises();
  // sets local storage for sound so this remains the same after page refresh
  const soundStorage = localStorage.getItem("sound");
  if (soundStorage == "on") {
    sound = `<div class="modal-icon" id="sound"><i class="fas fa-volume-up"></i></div>`;
    // used to check if sound is on or not
    on = true;
  } else {
    // if soundStorage == "off"
    // this is also the default option when the user first loads
    // the page as local storage is not set until the toggle is activated
    sound = `
              <div class="modal-icon" id="sound">
                <i class="fas fa-volume-mute"></i>
              </div>
            `;
    // used to check if sound is on or not
    on = false;
  }
  if (exercises.length) {
    $("#exercise-modal").show();
    $(".modal-content").html(`
      ${sound}
      <div id="close-modal" class="modal-icon">
        <i class="fas fa-times"></i>
      </div>
      <div class="buttons-div">
        <button class="my-button modal-button" id="easy">Take it easy</button>
        <button class="my-button modal-button" id="medium">Make me sweat</button>
        <button class="my-button modal-button" id="hard">Hardcore</button>
        <button class="my-button modal-button" id="custom">Custom</button>
      </div>
    `);
    // toggles sound
    toggleSound();
    $("#close-modal").click(function () {
      $("#exercise-modal").hide();
    });
    // if user selects 'take it easy' starts workout and sets times
    $("#easy").click(function () {
      setTimeout(function () {
        startWorkout(30, 60);
      }, 200);
    });
    // if user selects 'make me sweat' starts workout and sets times
    $("#medium").click(function () {
      setTimeout(function () {
        startWorkout(45, 45);
      }, 200);
    });
    // if user selects 'hardcore' starts workout and sets times
    $("#hard").click(function () {
      setTimeout(function () {
        startWorkout(60, 30);
      }, 200);
    });
    // if user selects 'custom', this takes them to time select screen
    $("#custom").click(function () {
      customOpen();
    });
  } else {
    // if no exercises in list
    noExercises();
  }
};

// Open exercise modal to start workout
$("#start-workout").click(function () {
  workoutStart();
});

// feedback form interactive script

// changes colour of submit button if all fields are valid
function submitChange() {
  if ($("#name").hasClass("green-input") && $("#tel").hasClass("green-input") && $("#email").hasClass("green-input") && $("#info").hasClass("green-input")) {
    $("#submit-button").removeClass("red-button");
  } else {
    $("#submit-button").addClass("red-button");
  }
}

// changes colour of start button in custom exercise times start button
function startChange() {
  if ($("#exercise-time").hasClass("green-input") && $("#rest-time").hasClass("green-input")) {
    $("#start").removeClass("red-button");
  } else {
    $("#start").addClass("red-button");
  }
}

// changes colour of input fields if all valid
function formColour(x) {
  $(x).keyup(function (e) {
    if (e.target.value.length) {
      $(x).removeClass("red-input");
      $(x).addClass("green-input");
    } else {
      $(x).removeClass("green-input");
      $(x).addClass("red-input");
    }
    // for form submit button
    submitChange();
    // for custom exercise times start button
    startChange();
  });
}

const inputs = document.querySelectorAll(".easy");
inputs.forEach((input) => {
  formColour(input);
});

// email function is seperate

// regex for valid email format taken from
// https://www.w3resource.com/javascript/form/email-validation.php
let letters = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

$("#email").keyup(function (e) {
  if (e.target.value.match(letters)) {
    $("#email").removeClass("red-input");
    $("#email").addClass("green-input");
  } else {
    $("#email").removeClass("green-input");
    $("#email").addClass("red-input");
  }
  submitChange();
});

// action upon submit contact form
$("#contact-form").submit(function (e) {
  e.preventDefault();
  if ($("#submit-button").hasClass("red-button")) {
    $("#toast").html(`
      <div class ="negative">
        <p>Please check all fields have been correctly filled!!</i></p>
      </div>
    `);
    $("#toast").show();
    setTimeout(function () {
      $("#toast").hide();
      $("#toast").html(``);
    }, 6000);
  } else {
    $("#toast").html(`
      <div class ="form-feedback">
        <p>Thank you for your feedback! <i class="far fa-smile"></i></p>
      </div>
    `);
    $("#toast").show();
    $("#contact-form")[0].reset();
    let inputs = document.querySelectorAll(".form-input");
    inputs.forEach((input) => {
      input.classList.remove("green-input");
      input.classList.add("red-input");
    });
    $("#submit-button").addClass("red-button");
    setTimeout(function () {
      $("#toast").hide();
      $("#toast").html(``);
    }, 6000);
  }
});

// function to add smooth scrolling when selecting anchor tags
// code copied and amended from W3 Schools tutorial
// https://www.w3schools.com/howto/howto_css_smooth_scroll.asp

$("a").click(function (e) {
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    // Prevent default anchor click behavior
    e.preventDefault();

    // Store hash
    let hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      1000,
      function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      }
    );
  } // End if
});

// Return to top button script copied and adapted from W3 schools tutorial
// https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

let mybutton = document.querySelector(".circle");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

// smooth function copied and adapted from tutorialdeep.com
// https://tutorialdeep.com/knowhow/smooth-scroll-to-top-jquery/

$("#toTop").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 1000);
  return false;
});
