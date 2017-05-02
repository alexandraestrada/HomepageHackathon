var sel_mode_icon = document.querySelector('#selection-mode');

var mode = '';

sel_mode_icon.addEventListener('click', function(event) {
  mode = 'drawing selection';
  console.log('in selection drawing mode');
});
