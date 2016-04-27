$(function() {
  $("li.draggable").mousedown(function() {
    $(this).css("pointer-events", "none");
    $(this).find("div").hide();
  });
  $("body").mouseup(function() {
    $("#imgDiv").find("li").css("pointer-events", "auto");
  })
  interact('img.draggable')
    .draggable({
      inertia: true,
      autoScroll: true,
      onmove: dragMoveListener,
      onend: function (event) {
        var textEl = event.target.querySelector('p');

        textEl && (textEl.textContent =
          'moved a distance of '
          + (Math.sqrt(event.dx * event.dx +
                       event.dy * event.dy)|0) + 'px');
      }
    });

    function dragMoveListener (event) {
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    };
});