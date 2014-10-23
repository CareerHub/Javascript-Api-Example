
(function(window, $, config, oauth) {

	var apiUrl = config.baseUrl + '/api/public/v1/';

	var getResource = function(resource, method, data) {
		if(!data) {
			data = {};
		}

		var getToken = oauth.clientCredentials.getAccessToken(),
			url = apiUrl + resource;

		return getToken.then(function(token) {
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
		});
	};

	if(!window.ch.api) {
		window.ch.api = {};
	}

	window.ch.api.jobseekers = {
		events: {
			list: function(options) {
				return getResource('events', 'GET', options);
			},
			search: function(text, take, skip) {
				if(!text) {
					throw 'Argument Exception: Text is required';
				}

				return getResource('events/search', 'GET', options);
			},
			get: function(id) {
				return getResource('events/' + id, 'GET');
			}
		}
	};

})(window, window.jQuery, window.ch.config, window.ch.oauth);