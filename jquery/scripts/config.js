
(function(window) {
	if(!window.ch) {
		window.ch = {};
	}

	window.ch.config = {
		baseUrl: 'https://dev.careerhub.com.au:4443/version3',
		api: {
			identifier: 'api.demo.javascript',
			secret: 'X4PMy5B8A4lYznnYjn7zgXTZoIUZdb64NBJF9F+o1rg=',
			scopes: 'Public.Events JobSeeker.Events'
		}
	};
})(window);