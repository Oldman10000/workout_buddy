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

// When the user clicks on the button, scroll to the top of the document
$("#toTop").click(function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})

// adding custom items to workout list
// code copied and adapted from Udemy Course
// 'Modern Javascript: From Novice to Ninja' - Author: Shaun Pelling

const addExercise = document.querySelector('.exercise-form');
const list = document.querySelector('#workout-list');

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
  console.log(exercise);
  template(exercise);
  addExercise.reset();
});

// adds existing exercises to workout list
$(".workout-add").click(function () {
  let exercise = $(this).parent().prev().text();
  console.log(exercise);
  const html = `
    <li class="exercise">
      <span class="activity">${exercise}</span>
      <i class="fas fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
  $(this).parent().prev().toggleClass('active');
  $(this).parent().slideToggle('slow');
})

// deletes items from workout list
$("#workout-list").click(function (e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  };
});

// create function for final workout list to be used for stopwatch function

// empty array of exercises
let exercises = [];

// pushes each item in myWorkout list to the exercises array
function getExercises() {
  let allExercises = document.querySelectorAll(".activity");
  allExercises.forEach(exercise => {
    exercises.push(exercise.innerText);
  })
  console.log(exercises);
}

// general workout timer function

// this loops through each item in the exercises array until workout is complete
startWorkout = function (sec1, sec2) {
  // gets array of exercises
  getExercises(); 
  // removes first exercise from array
  removeFirstExercise = function () {
    exercises.shift();
  }
  // timer for the exercise
  let timer = function () {
    let x = exercises[0];
    let sec = sec1
    let timer1 = setInterval(function () {
      $(".modal-content").html(`
          <p class="modal-heading">${x}</p>
          <div class="timer">
            <p class="timerdisplay">${sec}</p>
          </div>
        `);
      sec--;
      if (sec < 0) {
        clearInterval(timer1);
        removeFirstExercise();
        if (exercises.length == 0) {
          congratulations();
        } else {
          $("#ding")[0].play();
          restTimer(sec2);
        }
      }
    }, 1000);
  }

  timer(sec1);

  // timer for rest period between exercises
  let restTimer = function () {
    let sec = sec2;
    let timer2 = setInterval(function () {
      $(".modal-content").html(`
          <p class="modal-heading">Rest!</p>
          <div class="timer">
            <p class="timerdisplay">${sec}</p>
          </div>
        `);
      sec--;
      if (sec < 0) {
        clearInterval(timer2);
        $("#ding")[0].play();
        timer(sec1);
      }
    }, 1000)
  }

  // congratulations message when workout is complete
  let congratulations = function () {
    $(".modal-content").html(`
      <i class="fas fa-times" id="close-modal"></i>
      <h3>Congratulations!</h3>
      <p>Workout Complete</p>
      <img src="assets/images/champagne.png" alt="champagne" class="complete-img">
      <p>Share to social media</p>
      <div class="social">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-instagram"></i>
      </div>
    `);
    $("#close-modal").click(function () {
      $("#exercise-modal").hide();
    })
  }
}

// Open exercise modal to start workout

$("#start-workout").click(function () {
  $(".modal-content").html(`
    <i class="fas fa-times" id="close-modal"></i>
    <div class="buttons-div">
      <button class="btn btn-success modal-button" id="easy">Take it easy</button>
      <button class="btn btn-success modal-button" id="medium">Make me sweat</button>
      <button class="btn btn-success modal-button" id="hard">Hardcore</button>
    </div>
  `)
  $("#exercise-modal").show();
  $("#close-modal").click(function () {
    $("#exercise-modal").hide();
  })
  $("#easy").click(function () {
    startWorkout(5, 5);
  })
  $("#medium").click(function () {
    startWorkout(45, 45);
  })
  $("#hard").click(function () {
    startWorkout(60, 30);
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