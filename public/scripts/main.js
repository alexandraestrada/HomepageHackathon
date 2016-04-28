require.config({
	paths: {
		"jquery": "vendor/jquery/dist/jquery",
		"backbone": "vendor/backbone-amd/backbone",
		"underscore": "vendor/underscore-amd/underscore"

	}
})

require(['views/view'], function(AppView) {
	new AppView
})