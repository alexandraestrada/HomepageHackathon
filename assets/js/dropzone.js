
// console.log('it hit!')
Dropzone.options.dzForm = {
	init: function() {
		this.on('success', function(file, resp) {
			$('#fileDiv').css('display','none');
			var imageArray = []
			$("#dzForm").append($('<input type="hidden" ' +
              'name="files[]" ' + 'value="' + resp.fileName + '">'))
			console.log(file.name)
			// $('#imgList').show()
			$('#imgList').append('<li><img /></li>');
			$('#imgList li:last-child img').attr('src', './images/uploads/' + file.name)
			
		})
	}
}