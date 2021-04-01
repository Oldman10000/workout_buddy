// navbar toggle - code copied and adapted from W3 schools tutorial
// https://www.w3schools.com/howto/howto_js_mobile_navbar.asp

function toggleNav() {
  let x = document.querySelector('#myLinks');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

$("#hamburger, .section-link").click(function () {
  toggleNav();
});

// toggles display of workout instructions
$(".toggle-trigger").click(function () {
  $(this).toggleClass('active').next().slideToggle('slow');
  $(this).parent().toggleClass('green');
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
  template(exercise);
  addLocal();
  addExercise.reset();
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
  // deletes from local storage
  addLocal();
});

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
      <p>Share to social media</p>
      <div class="social">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-instagram"></i>
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
  $("#exercise-modal").show();
  $(".modal-content").html(`
    <i class="fas fa-times" id="close-modal"></i>
    <div class="buttons-div">
      <button class="my-button modal-button" id="easy">Take it easy</button>
      <button class="my-button modal-button" id="medium">Make me sweat</button>
      <button class="my-button modal-button" id="hard">Hardcore</button>
    </div>
  `)
  $("#close-modal").click(function () {
    $("#exercise-modal").hide();
  })
  getExercises();
  $("#easy").click(function () {
    if (exercises.length) {
      setTimeout(function () {
        startWorkout(30, 60);
      }, 200);
    } else {
      noExercises();
    }
  })
  $("#medium").click(function () {
    if (exercises.length) {
      setTimeout(function () {
        startWorkout(45, 45);
      }, 200);
    } else {
      noExercises();
    }
  })
  $("#hard").click(function () {
    if (exercises.length) {
      setTimeout(function () {
        startWorkout(60, 30);
      }, 200);
    } else {
      noExercises();
    }
  })
})

// action upon submit contact form
$("#contact-form").submit(function (e) {
  e.preventDefault();
  $(".form-feedback").show();
  setTimeout(function () {
    $(".form-feedback").hide();
  }, 6000);
  $("#contact-form")[0].reset();
})

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

// smooth function copied and adapted from tutorialdeep.com
// https://tutorialdeep.com/knowhow/smooth-scroll-to-top-jquery/

$('#toTop').click(function () {
  $("html, body").animate({ scrollTop: 0 }, 1000);
  return false;
});