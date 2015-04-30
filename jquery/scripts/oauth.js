
(function(window, config) {
	if(!config) {
		throw 'CareerHub Config not loaded';
	}

	var oauth = {};
	window.ch.oauth = oauth;

	oauth.helper = {
		getAuthUrl: function () {
			return config.baseUrl + '/oauth/auth';
		},
		getTokenUrl: function () {
			return config.baseUrl + '/oauth/token';
		}
	};


})(window, window.ch.config);