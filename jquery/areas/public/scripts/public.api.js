
(function(window, $, config, oauth) {

	var apiUrl = config.baseUrl + '/api/public/v1/';

	var getResource = function(resource, method, data) {
		if(!data) {
			data = {};
		}

		var getToken = oauth.clientCredentials.getAccessToken(),
			url = apiUrl + resource;

		return getToken.pipe(function(token) {
			return $.ajax({
				url: url,
				type: method,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + token
				},
				data: data
			});
		});
	};

	if(!window.ch.api) {
		window.ch.api = {};
	}

	window.ch.api.public = {
		events: {
			list: function(take, skip) {
				return getResource('events', 'GET', {
					take: take,
					skip: skip
				});
			},
			search: function(text, take, skip) {
				if(!text) {
					throw 'Argument Exception: Text is required';
				}

				return getResource('events/search', 'GET', {
					text: text,
					take: take,
					skip: skip
				});
			},
			get: function(id) {
				return getResource('events/' + id, 'GET');
			}
		}



	};



})(window, window.jQuery, window.ch.config, window.ch.oauth);