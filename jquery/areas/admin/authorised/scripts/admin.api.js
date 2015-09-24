
(function(window, $, config, oauth) {

	var apiUrl = config.baseUrl + '/api/admin/v1/';

	var getResource = function(resource, method, data) {
		if(!data) {
			data = {};
		}

		var token = oauth.implicit.getAccessToken(),
				url = apiUrl + resource;

		var options = {
			crossDomain: true,
			url: url,
			type: method,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + token
			},
			data: data
		};

		return $.ajax(options);
	};

	if(!window.ch.api) {
		window.ch.api = {};
	}

	window.ch.api.admin = {
		details: {
			get: function() {
				return getResource('details', 'GET');
			}
		}
	};

})(window, window.jQuery, window.ch.config, window.ch.oauth);