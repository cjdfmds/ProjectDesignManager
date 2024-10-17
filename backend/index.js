const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors'); // Import CORS package

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow Cross-Origin requests



// Cognito Identity Service Provider
const cognito = new AWS.CognitoIdentityServiceProvider();
const s3 = new AWS.S3();
const jwt = require('jsonwebtoken');

// DynamoDB setup
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_POOL_ID = 'ap-southeast-2_wpBig9rKB';
const USER_POOL_WEB_CLIENT_ID = '117jbifc6grn3ml2j7v0g96u95';

const verifyToken = (token) => {
    try {
        return jwt.decode(token); // Optionally verify the token if using a signing key
    } catch (err) {
        console.error('Invalid token');
        return null;
    }
};

// Add the login route here:
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const params = {
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        UserPoolId: USER_POOL_ID,
        ClientId: USER_POOL_WEB_CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password
        }
    };

    try {
        const data = await cognito.adminInitiateAuth(params).promise();
        const idToken = data.AuthenticationResult.IdToken;

        // Optionally, check the user's group (Admin/User)
        const userGroups = await getUserGroups(username);

        res.json({ token: idToken, groups: userGroups });
    } catch (err) {
        console.error('Login failed:', err);
        res.status(401).send('Invalid credentials');
    }
});

// Function to retrieve user groups from Cognito
const getUserGroups = async (username) => {
    const params = {
        UserPoolId: USER_POOL_ID,
        Username: username,
    };

    try {
        const data = await cognito.adminListGroupsForUser(params).promise();
        return data.Groups.map(group => group.GroupName);
    } catch (err) {
        console.error('Error fetching user groups:', err);
        return [];
    }
};



app.post('/upload', (req, res) => {
    const file = req.body.file; // Adjust this based on how you're sending the file from the frontend

    const params = {
        Bucket: 'creationhub-erps', // Replace with your bucket name
        Key: file.name,
        Body: file,
        //ACL: 'public-read', // Adjust according to your use case
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).send(err);
        }
        console.log('File uploaded successfully', data.Location);
        return res.status(200).send({ url: data.Location });
    });
});

app.post('/store-user-details', async (req, res) => {
    const { username, email, role } = req.body; // Example user data

    const params = {
        TableName: 'UserDetails',
        Item: {
            username: username,
            email: email,
            role: role,
            createdAt: new Date().toISOString()
        }
    };

    try {
        await dynamodb.put(params).promise();
        res.send('User details stored successfully');
    } catch (err) {
        console.error('Error storing user details:', err);
        res.status(500).send('Error storing user details');
    }
});

app.post('/dashboard', async (req, res) => {
    const { token } = req.body;

    // Verify token and get user groups
    const decodedToken = verifyToken(token); // Add your token verification logic
    const userGroups = await getUserGroups(decodedToken.username);

    if (userGroups.includes('Admins')) {
        res.send('Admin dashboard');
    } else if (userGroups.includes('Users')) {
        res.send('User dashboard');
    } else {
        res.status(403).send('Access Denied');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

