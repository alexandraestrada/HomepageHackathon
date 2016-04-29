$(function() {
	"use strict";
	$("#infoDiv").css("width", $("#contentDiv").width());
	$("#altInput").focusout(function() { $("li.selected").find("img").attr("alt", $(this).val()); });

	var isDraw = false;

	$( "#imgList, #imgMainList" ).sortable({
		"placeholder": "temp",
		"cursor": "move",
		"connectWith": "#imgMainList, #imgList",
		"start": function(ev, ui) {
			ui.placeholder.animate({
				width: ui.helper.width(),
				height: ui.helper.height()
			}, 500);
		},
		"stop": function(ev, ui) {
			$("#imgMainList").find("li.selected").removeClass("selected");
			ui.item.addClass("selected");
			$("#altInput").focus().val(ui.item.find("img").attr("alt") || "");
			$("body").removeAttr("style");
		},
		"revert": true
	});
	$( "#imgList, #imgMainList" ).disableSelection();

	$("#imgMainList").on("click", function(ev) {
		if($("#altInput").val().length) {
			$("li.selected").find("img").attr("alt", $("#altInput").val());
		}
		if(ev.target.tagName.toLowerCase() === "img") {
			$("li.selected").removeClass("selected");
			$(ev.target).parent().addClass("selected");
			$("#altInput").val($(ev.target).attr("alt") || "").focus();
			if(isDraw) {
				var cx = ev.clientX, cy = ev.clientY,
				$img = $(ev.target),
				ox = $img.offset().left, oy = $img.offset().top,
				$new = $("<div/>").addClass("rect resize-drag").css({
					top: cy - oy - 10,
					left: cx - ox - 10
				});
				$img.parent().append($new);
			}
			!isDraw && $( "#imgList, #imgMainList" ).sortable("enable");
		}
		if(ev.target.tagName.toLowerCase() === "div") $( "#imgList, #imgMainList" ).sortable("disable");
	});

	window.dragMoveListener = function(event) {
			var target = event.target,
		        // keep the dragged position in the data-x/data-y attributes
		        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		    // translate the element
		    target.style.webkitTransform =
		    target.style.transform =
		    'translate(' + x + 'px, ' + y + 'px)';

		    // update the posiion attributes
		    target.setAttribute('data-x', x);
		    target.setAttribute('data-y', y);
		 }
	interact('.resize-drag')
	  .draggable({
	    onmove: window.dragMoveListener
	  })
	  .resizable({
	    preserveAspectRatio: false,
	    edges: { left: true, right: true, bottom: true, top: true }
	  })
	  .on('resizemove', function (event) {
	    var target = event.target,
	        x = (parseFloat(target.getAttribute('data-x')) || 0),
	        y = (parseFloat(target.getAttribute('data-y')) || 0);

	    // update the element's style
	    target.style.width  = event.rect.width + 'px';
	    target.style.height = event.rect.height + 'px';

	    // translate when resizing from top or left edges
	    x += event.deltaRect.left;
	    y += event.deltaRect.top;

	    target.style.webkitTransform = target.style.transform =
	        'translate(' + x + 'px,' + y + 'px)';

	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
	  });

	$("#drawRect").click(function() {
		isDraw = true;
		$( "#imgList, #imgMainList" ).sortable("disable");
	});
	$("#selectA").click(function() {
		isDraw = false;
		$( "#imgList, #imgMainList" ).sortable("enable");
	});
});