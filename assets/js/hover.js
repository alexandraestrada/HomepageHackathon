$(function() {
	$("li.draggable").hover(function() {
		$(this).find("div").css({
			"display": "block";
			"background-color": "black";
			"opacity": "0.9";
			"color": "white";
			"text-align": "center";
			"cursor": "move";
		});
	}, function() {});
});