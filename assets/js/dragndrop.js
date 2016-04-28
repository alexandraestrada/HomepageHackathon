$(function() {
  $( "#imgList, #imgMainList" ).sortable({
    "placeholder": "temp",
    "cursor": "move",
    "connectWith": "#imgMainList, #imgList",
    "start": ondrag,
    "stop": ondrop,
    // "cursorAt": {top: 25, left: 25},
    "revert": true
  });
  $( "#imgList, #imgMainList" ).disableSelection();

  function ondrag(ev, ui) {
    ui.placeholder.animate({
      width: ui.helper.width(),
      height: ui.helper.height()
    }, 500);
  }

  function ondrop(ev, ui) {
    /*$("#infoDiv").css({
      top: ui.item.offset().top + ui.item.find("img").height() + 20,
      left: ui.item.offset().left
    }).fadeIn(750);*/
    $("#imgMainList").find("li.selected").removeClass("selected");
    ui.item.addClass("selected");
    $("#altInput").focus().val(ui.item.find("img").attr("alt") || "");
  }

  /*interact('img.draggable')
    .draggable({
      inertia: true,
      autoScroll: true,
      onmove: dragMoveListener,
      onend: function (event) {
        alert("hi");
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
    };*/
});