const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const getUsersByEmail = async (req, res) => {

    if (req.isAuthenticated()) {
        try {
          // Get the user's OAuth token from the session
          const accessToken = store('accessToken').my_token;
    
          // Create the authenticated Google API client
          const auth = new google.auth.OAuth2();
          auth.setCredentials({ access_token: accessToken });
    
          // Fetch the users in the domain
          const service = google.admin({ version: 'directory_v1', auth });
          const response = await service.users.list({
            customer: 'my_customer',
            maxResults: 10,
            orderBy: 'email',
          });
    
          const users = response.data.users;
          if (!users || users.length === 0) {
            res.json({message: 'No Users for this account.'});
          } else {
            res.status(200).json(users);
          }
        } catch (error) {
          res.status(500).json({error: error.message});
        }
      } else {
        console.log('User not authenticated.');
        res.redirect('/');
      }
  
}

module.exports = { 
    getUsersByEmail
}