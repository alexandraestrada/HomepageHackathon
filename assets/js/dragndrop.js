$(function() {
  /*$("#imgList,#imgMainList").sortable({
          connectWith: "#imgList,#imgMainList",
  });
  $("#imgList,#imgMainList").disableSelection();*/

  $( "#imgList, #imgMainList" ).sortable({
    "placeholder": "temp",
    "cursor": "move",
    "connectWith": "#imgMainList, #imgList",
    "start": ondrag,
    "stop": ondrop
  });
  $( "#imgList, #imgMainList" ).disableSelection();

  function ondrag(ev, ui) {
    ui.placeholder.animate({
      width: ui.helper.width(),
      height: ui.helper.height()
    }, 1000);
    ui.helper.animate({
      width: ui.item.width(),
      height: ui.item.height()
    }, 1000, function() {alert("hi")});
  }

  function ondrop() {
    //alert("hi")
  }

  // interact('img.draggable')
  //   .draggable({
  //     inertia: true,
  //     autoScroll: true,
  //     onmove: dragMoveListener,
  //     onend: function (event) {
  //       alert("hi");
  //     }
  //   });

  //   function dragMoveListener (event) {
  //     var target = event.target,
  //         // keep the dragged position in the data-x/data-y attributes
  //         x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
  //         y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  //     target.style.webkitTransform =
  //     target.style.transform =
  //       'translate(' + x + 'px, ' + y + 'px)';

  //     // update the posiion attributes
  //     target.setAttribute('data-x', x);
  //     target.setAttribute('data-y', y);
  //   };
});