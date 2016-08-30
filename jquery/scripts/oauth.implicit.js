
(function(window, oauth, config, $) {
	var tokenKey = 'chAccessToken';
	var expiresInKey = 'chExpiresIn';

	oauth.implicit = {
		getAccessToken: function() {
			var token = sessionStorage.getItem(tokenKey);
			var expiresString = sessionStorage.getItem(expiresInKey);

			if(!token || !expiresString) {
				window.location = oauth.implicit.getLoginLink();
			}

			var expires = new Date(expiresString);
			if (expires < new Date()) {
				// token expired
				window.location = oauth.implicit.getLoginLink();
			}

			return token;
		},

		getLoginLink: function() {
			var link = "{0}?response_type=token&client_id={1}&redirect_uri={2}&scope={3}&state={4}".format(
				oauth.helper.getAuthUrl(),
				config.api.identifier,
				'http://localhost:5000/jquery/callback.html',
				encodeURIComponent('JobSeeker.Personal.Details JobSeeker.Events JobSeeker.Jobs JobSeeker.Forms'),
				window.location.href
			);

			return link
		},

		processCallback: function() {
			var params = oauth.implicit.parseCallbackQueryString();

			// store access token
			sessionStorage.setItem(tokenKey, params.access_token);

			//params.expires_in;
			var expires = new Date();
			expires.setSeconds(expires.getSeconds() + parseInt(params.expires_in, 10));
			sessionStorage.setItem(expiresInKey, expires.toString());
			//params.scope;
			//params.bearer;
			//params.state

			if(params.state) {
				window.location = params.state;
			} else {
				window.location = 'index.html'
			}
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
})(window, window.ch.oauth, window.ch.config, window.jQuery);
