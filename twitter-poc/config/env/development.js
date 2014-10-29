'use strict';

module.exports = {
	db: 'mongodb://meanuser:meanpass@linus.mongohq.com:10094/twitter-poc',
	app: {
		title: 'twitter-poc - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'TLMVkVzLc31fE6NGluyk30aPK',
		clientSecret: process.env.TWITTER_SECRET || '9RHCIaiuIwlThmHuZqbM9b8IMWaY0WAqQmV32fVmqLJf26A2cR',
		access_token: process.env.access_token || '481384292-er40MHCi5zA4IbbfgLhMtKEXd8fMWoRrHSIwQsca',
		access_token_secret: process.env.access_token_secret || 'iOrlnuzQJH850koN7npB8gWp6TaSNiFu966mdMhf8TaW1',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};