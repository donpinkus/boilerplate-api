const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Use "session: false" since the token will be supplied with each request.
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	// Pass through requireAuth step before handler.
	app.get('/', requireAuth, function(req, res){
		res.send({ message: 'Super secret code is ABC1234' });
	});
	
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
}