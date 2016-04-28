$(function() {
	$("#infoDiv").css("width", $("#contentDiv").width());

	$("#imgMainList").on("click", function(e) {
		if(e.target.tagName.toLowerCase() === "img") {
			$("li.selected").removeClass("selected");
			$(e.target).parent().addClass("selected");
		}
	});

	$("#addAlt").click(function() {
		$("li.selected").find("img").attr("alt", $("#altInput").val());
		$("#altInput").val("");
	})
});