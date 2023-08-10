const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const googleAuth = async (req, res) => {

    if (req.isAuthenticated())
    {

        try {

            const accessToken = req.session.

        } catch (err) {
            res.status(500).json()
        }

    }
    else {
        res.status(403).json({message: "user not authenticated"})
    }

}
