// light/dark mode toggle
$("#light-dark-toggle").click(function () {
  $(this).toggleClass('toggle-light');
  $(".light").toggleClass('dark');
});

// navbar toggle
$("#hamburger").click(function () {
  $(this).toggleClass('flip');
  $(".nav").toggleClass('visible');
  $("main").toggleClass('shrink');
});

// toggles display of workout instructions
$(".toggle-trigger").click(function () {
  $(this).toggleClass('active').next().slideToggle('slow');
  $(this).parent().toggleClass('green');
});

// empty array of exercises on workout list
let exercises = [];

// pushes each item in myWorkout list to the exercises array
function getExercises() {
  exercises = [];
  let allExercises = document.querySelectorAll(".activity");
  allExercises.forEach(exercise => {
    exercises.push(exercise.innerText);
  })
}

// refreshes local storage by taking the current data from the DOM every time this is run
function addLocal() {
  getExercises();
  let savedExercises = Object.assign({}, exercises);
  localStorage.setItem('exercises', JSON.stringify(savedExercises));
}

// adding custom items to workout list
// code copied and adapted from Udemy Course
// 'Modern Javascript: From Novice to Ninja' - Author: Shaun Pelling

const addExercise = document.querySelector('.exercise-form');
const list = document.querySelector('#workout-list');

// gets exercises from local storage
function getLocal() {
  const stored = localStorage.getItem('exercises');
  let data = JSON.parse(stored);
  $.each(data, function (i, val) {
    const html = `
    <li class="exercise">
      <span class="activity">${val}</span>
      <i class="fas fa-trash-alt delete"></i>
    </li>
  `;
    list.innerHTML += html;
  })
}

// runs every time the page is refreshed and returns local storage
getLocal();

// creates template literal for exercises added to list
const template = exercise => {
  const html = `
    <li class="exercise">
      <span class="activity">${exercise}</span>
      <i class="fas fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
}

// adds content of box to workout list upon submit
// values are trimmed to show only text content to remove any whitespace
addExercise.addEventListener('submit', e => {
  e.preventDefault();
  let exercise = addExercise.add.value.trim();
  if (exercise.length) {
    template(exercise);
    startColour()
    addLocal();
    addExercise.reset();
  } else {
    alert('No text entered!');
  }
});

// adds existing exercises to workout list
$(".workout-add").click(function () {
  let exercise = $(this).parent().prev().text();
  const html = `
    <li class="exercise">
      <span class="activity">${exercise}</span>
      <i class="fas fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
  startColour()
  addLocal();
  $(this).css({
    background: '#33C173'
  })
  let x = $(this);
  setTimeout(function () {
    console.log('hello');
    $(x).parent().prev().toggleClass('active');
    $(x).parent().slideToggle('slow');
    $(x).parent().parent().toggleClass('green');
    $(x).css({
      background: '#efefef'
    })
  }, 1000);
})

// deletes items from workout list
$("#workout-list").click(function (e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  };
  startColour()
  // deletes from local storage
  addLocal();
});

// checks if there are any exercises in the workout and switches colour of start button depending
function startColour() {
  getExercises();
  if (exercises.length) {
    $("#start-workout").removeClass("red-button");
  } else {
    $("#start-workout").addClass("red-button");
  }
}

startColour();

// general workout timer function

// this loops through each item in the exercises array until workout is complete
startWorkout = function (sec1, sec2) {
  // gets array of exercises
  getExercises();
  // removes first exercise from array
  removeFirstExercise = function () {
    exercises.shift();
  }
  // gets width of container
  let width = $(".modal-content").width();
  // timer for the exercise
  let timer = function () {
    let x = exercises[0];
    let sec = sec1
    let timer1 = setInterval(function () {
      $(".modal-content").html(`
          <i class="fas fa-times" id="close-modal"></i>
          <p class="modal-heading">${x}</p>
          <div class="timer">
            <p class="timerdisplay">${sec}</p>
          </div>
          <div class="progress"></div>
        `);
      sec--;
      $("#close-modal").click(function () {
        $("#exercise-modal").hide();
        clearInterval(timer1);
      })
      let progWidth = ((sec + 1) * width / sec1);
      $(".progress").css({
        width: progWidth + 'px'
      });
      if (sec < 20) {
        $(".timer").css({
          background: '#ffa630'
        });
        $(".progress").css({
          background: '#ffa630'
        });
        $(".modal-content").css({
          border: '2.5px solid #ffa630'
        });
      }
      if (sec < 10) {
        $(".timer").css({
          background: '#d53910'
        });
        $(".progress").css({
          background: '#d53910'
        });
        $(".modal-content").css({
          border: '2.5px solid #d53910'
        });
      }
      if (sec == 9 || sec == 19) {
        $("#ding")[0].play();
      }
      if (sec < 0) {
        clearInterval(timer1);
        removeFirstExercise();
        if (exercises.length == 0) {
          $("#cheer")[0].play();
          setTimeout(function () {
            congratulations();
            $(".modal-content").css({
              border: '2.5px solid #33C173'
            });
          }, 1000);
        } else {
          $("#buzz")[0].play();
          setTimeout(function () {
            $(".modal-content").css({
              border: '2.5px solid #33C173'
            });
            restTimer(sec2);
          }, 1000);
        }
      }
    }, 1000);
  }

  // timer for rest period between exercises
  let restTimer = function () {
    let sec = sec2;
    let x = exercises[0];
    let timer2 = setInterval(function () {
      $(".modal-content").html(`
          <i class="fas fa-times" id="close-modal"></i>
          <p class="modal-heading">Rest!<br>Next Exercise: ${x}</p>
          <div class="timer">
            <p class="timerdisplay">${sec}</p>
          </div>
          <div class="progress"></div>
        `);
      sec--;
      $("#close-modal").click(function () {
        $("#exercise-modal").hide();
        clearInterval(timer2);
      })
      let progWidth = ((sec + 1) * width / sec2);
      $(".progress").css({
        width: progWidth + 'px'
      });
      if (sec < 20) {
        $(".timer").css({
          background: '#ffa630'
        });
        $(".progress").css({
          background: '#ffa630'
        });
        $(".modal-content").css({
          border: '2.5px solid #ffa630'
        });
      }
      if (sec < 10) {
        $(".timer").css({
          background: '#d53910'
        });
        $(".progress").css({
          background: '#d53910'
        });
        $(".modal-content").css({
          border: '2.5px solid #d53910'
        });
      }
      if (sec == 9 || sec == 19) {
        $("#ding")[0].play();
      }
      if (sec < 0) {
        clearInterval(timer2);
        $("#buzz")[0].play();
        setTimeout(function () {
          $(".modal-content").css({
            border: '2.5px solid #33C173'
          });
          timer(sec1);
        }, 1000);
      }
    }, 1000);
  }

  let countDown = function () {
    let sec = 15;
    let sec3 = 15;
    let x = exercises[0];
    let timer3 = setInterval(function () {
      $(".modal-content").html(`
          <i class="fas fa-times" id="close-modal"></i>
          <p class="modal-heading">Get Ready...</p>
          <div class="timer">
            <p class="timerdisplay">${sec}</p>
          </div>
          <div class="progress"></div>
        `);
      sec--;
      $("#close-modal").click(function () {
        $("#exercise-modal").hide();
        clearInterval(timer3);
      })
      let progWidth = ((sec + 1) * width / sec3);
      $(".progress").css({
        width: progWidth + 'px'
      });
      if (sec < 10) {
        $(".timer").css({
          background: '#ffa630'
        });
        $(".progress").css({
          background: '#ffa630'
        });
        $(".modal-content").css({
          border: '2.5px solid #ffa630'
        });
      }
      if (sec < 5) {
        $(".timer").css({
          background: '#d53910'
        });
        $(".progress").css({
          background: '#d53910'
        });
        $(".modal-content").css({
          border: '2.5px solid #d53910'
        });
      }
      if (sec == 4 || sec == 9) {
        $("#ding")[0].play();
      }
      if (sec < 0) {
        clearInterval(timer3);
        $("#buzz")[0].play();
        setTimeout(function () {
          $(".modal-content").css({
            border: '2.5px solid #33C173'
          });
          timer(sec1);
        }, 1000);
      }
    }, 1000);
  }

  countDown();

  // congratulations message when workout is complete
  let congratulations = () => {
    $(".modal-content").html(`
      <i class="fas fa-times" id="close-modal"></i>
      <h3>Congratulations!</h3>
      <p>Workout Complete</p>
      <div class="complete-img-div">
        <img src="assets/images/champagne.png" alt="champagne" class="complete-img">
      </div>
      <div class="social">
        <p>Share to social media!!</p>
        <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a>
        <a href="https://www.twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
      </div>
    `);
    $("#close-modal").click(function () {
      $("#exercise-modal").hide();
    });
  }
}

// if there are no exercises on the workout
function noExercises() {
  alert('no exercises in list!!');
}

// Open exercise modal to start workout

$("#start-workout").click(function () {
  if (exercises.length) {
    $("#exercise-modal").show();
    $(".modal-content").html(`
    <i class="fas fa-times" id="close-modal"></i>
    <div class="buttons-div">
      <button class="my-button modal-button" id="easy">Take it easy</button>
      <button class="my-button modal-button" id="medium">Make me sweat</button>
      <button class="my-button modal-button" id="hard">Hardcore</button>
      <button class="my-button modal-button" id="custom">Custom</button>
    </div>
  `);
    $("#close-modal").click(function () {
      $("#exercise-modal").hide();
    });
    getExercises();
    $("#easy").click(function () {
      setTimeout(function () {
        startWorkout(30, 60);
      }, 200);
    });
    $("#medium").click(function () {
      setTimeout(function () {
        startWorkout(45, 45);
      }, 200);
    });
    $("#hard").click(function () {
      setTimeout(function () {
        startWorkout(60, 30);
      }, 200);
    });
    $("#custom").click(function () {
      $(".modal-content").html(`
      <i class="fas fa-times" id="close-modal"></i>
        <div class="times-div">
          <div>
            <label for="exercise-time" aria-label="exercise time"></label>
            <input class="custom-number" id="exercise-time" type="number" placeholder="Exercise (s)">
          </div>
          <div>
            <label for="rest-time" aria-label="rest time"></label>
            <input class="custom-number" id="rest-time" type="number" placeholder="Rest (s)">
          </div>
          <button class="my-button modal-button" id="start">Start!</button>
        </div>
       </div>
    `);
      $("#close-modal").click(function () {
        $("#exercise-modal").hide();
      });
      $("#start").click(function () {
        let x = $("#exercise-time").val();
        let y = $("#rest-time").val();
        if (x.length && y.length) {
          setTimeout(function () {
            startWorkout(x, y);
          }, 200);
        } else {
          alert('No times selected!!');
        }
      });
    });
  } else {
    noExercises();
  }
})

// feedback form interactive script

// changes colour of submit button if all fields are valid
function submitChange() {
  if ($("#name").hasClass("green-input") && $("#tel").hasClass("green-input") && $("#email").hasClass("green-input") && $("#info").hasClass("green-input")) {
    $("#submit-button").removeClass("red-button");
  } else {
    $("#submit-button").addClass("red-button");
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
    submitChange();
  });
}

const inputs = document.querySelectorAll(".easy");
inputs.forEach(input => {
  formColour(input);
});

// email function is seperate

// regex for valid email format taken from https://www.w3resource.com/javascript/form/email-validation.php
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
  $(".form-feedback").show();
  $("#contact-form")[0].reset();
  let inputs = document.querySelectorAll(".form-input");
  inputs.forEach(input => {
    input.classList.remove("green-input");
    input.classList.add("red-input");
  });
  $("#submit-button").addClass("red-button");
  setTimeout(function () {
    $(".form-feedback").hide();
  }, 6000);
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
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, function () {

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if
});

// Return to top button script copied and adapted from W3 schools tutorial
// https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

mybutton = document.querySelector('.circle');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// smooth function copied and adapted from tutorialdeep.com
// https://tutorialdeep.com/knowhow/smooth-scroll-to-top-jquery/

$('#toTop').click(function () {
  $("html, body").animate({ scrollTop: 0 }, 1000);
  return false;
});
