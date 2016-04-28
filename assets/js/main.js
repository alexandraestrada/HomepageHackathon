$(function() {
	$("#infoDiv").css("width", $("#contentDiv").width());

	$("#imgMainList").on("click", function(e) {
		if(e.target.tagName.toLowerCase() === "img") {
			$("li.selected").removeClass("selected");
			$(e.target).parent().addClass("selected");
			$("#altInput").val($(e.target).attr("alt"));
		}
	});

	$("#altInput").blur(function() {
		$("li.selected").find("img").attr("alt", $(this).val());
	});

	// $(window).resize(function() {
	// 	var $layout = $("#layoutDiv");
	// 	if($("#contentDiv").width() < 960) {
	// 		$layout.width("100%").find("li").each(function() {
	// 			var temp = 600;
	// 			$(this).width((($layout.width() * temp) / 960) + "px");
	// 		});
	// 	}
	// }).trigger("resize");
});