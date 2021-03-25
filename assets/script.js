// toggles display of workout instructions

$(".toggle-trigger").click(function () {
  $(this).toggleClass('active').next().slideToggle('slow');
});

// navbar toggle

$("#hamburger").click(function () {
  let x = document.querySelector('#myLinks');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
});