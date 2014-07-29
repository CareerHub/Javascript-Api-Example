
(function(oauth, config, $) {

	var tokenDeferred = null;

	var requestToken = function() {
		tokenDeferred = $.Deferred();

		var url = oauth.helper.getTokenUrl();

		$.ajax({
			type: 'POST',
			url: url,
			data: {
				grant_type: 'client_credentials',
				client_id: config.api.identifier,
				client_secret: config.api.secret,
				scope: config.api.scopes
			}
		}).done(function(data, status) {
			tokenDeferred.resolve(data.access_token);
		}).fail(function() {
			tokenDeferred.reject();
		});
	}


	oauth.clientCredentials = {
		getAccessToken: function() {
			if(!tokenDeferred || tokenDeferred.state() === 'rejected') {
				requestToken();
			}

			return tokenDeferred.promise();
		}
	};
})(window.ch.oauth, window.ch.config, window.jQuery);