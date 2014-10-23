
(function(oauth, config, $) {

	oauth.implicit = {
		getLoginLink: function() {
			var link = "{0}?response_type=token&client_id={1}&redirect_uri={2}&scope={3}".format(
				oauth.helper.getTokenUrl(),
				config.api.identifier,
				'http://localhost/javascript-api-example/jquery/areas/jobseekers/index.html',
				config.api.scopes
			);

			return link
		},

		parseCallbackQueryString: function() {
			var params = {}, 
				queryString = location.hash.substring(1),
			    regex = /([^&=]+)=([^&]*)/g, m;

			while (m = regex.exec(queryString)) {
			  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
			}

			return params;
		}
	};
})(window.ch.oauth, window.ch.config, window.jQuery);