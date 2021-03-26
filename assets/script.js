// toggles display of workout instructions

$(".toggle-trigger").click(function () {
  $(this).toggleClass('active').next().slideToggle('slow');
});

// navbar toggle

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

const template = exercise => {
  const html = `
  <li class="exercise">${exercise}<li>
  `;
  list.innerHTML += html;
}

addExercise.addEventListener('submit', e => {
  e.preventDefault();
  let exercise = addExercise.add.value.trim();
  console.log(exercise);
  template(exercise);
  addExercise.reset();
});

// add existing exercises to workout list

$(".workout-add").click(function () {
  let text = $(this).parent().prev().text();
  console.log(text);
  const html = `
  <li class="exercise">${text}<li>
  `;
  list.innerHTML += html;
})

// action upon submit contact form

$("#contact-form").submit(function (e) {
  e.preventDefault();
  $(".form-feedback").css("display", "block");
  setTimeout(function () {
    $(".form-feedback").css("display", "none");
  }, 6000);
  $("#contact-form")[0].reset();
})