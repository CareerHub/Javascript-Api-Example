
(function(window, $, config, oauth) {

	var apiUrl = config.baseUrl + '/api/jobseeker/v1/';

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

	window.ch.api.jobseekers = {
		events: {
			list: function(options) {
				return getResource('events', 'GET', options);
			},
			search: function(text, take, skip) {
				if(!text) {
					throw 'Argument Exception: Text is required';
				}

				var options = {
					text: text,
					take: take,
					skip: skip
				};

				return getResource('events/search', 'GET', options);
			},
			get: function(id) {
				return getResource('events/' + id, 'GET');
			}
		},
		jobs: {
			list: function(options) {
				return getResource('jobs', 'GET', options);
			},
			search: function(text, take, skip) {
				
				var options = {
					text: text,
					take: take,
					skip: skip
				};
				
				return getResource('jobs/search', 'GET', options);
			},
			get: function(id) {
				return getResource('jobs/' + id, 'GET');
			}
		}
	};

})(window, window.jQuery, window.ch.config, window.ch.oauth);