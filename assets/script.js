// toggles display of workout instructions

$(".toggle-trigger").click(function () {
  $(this).toggleClass('active').next().slideToggle('slow');
});