// activate dark mode if 'prefers-color-scheme: dark' is supported and preferred
// ..or toggle dark mode using a button
// https://web.dev/prefers-color-scheme/

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const switcher = document.querySelector(".darkmodeswitch");

switcher.addEventListener("change", function(e) {
  $('body').toggleClass('dark');
  e.preventDefault();
});

$(function() {
if (prefersDark) {
  $('body').addClass('dark');
}
}); 