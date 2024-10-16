const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors'); // Import CORS package

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow Cross-Origin requests

// AWS S3 Configuration
AWS.config.update({
    region: 'your-region',
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_KEY'
});

const s3 = new AWS.S3();

// Your API endpoints will go here

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.post('/upload', (req, res) => {
    const file = req.body.file; // Adjust this based on how you're sending the file from the frontend

    const params = {
        Bucket: 'your-bucket-name',
        Key: file.name,
        Body: Buffer.from(file.data, 'base64'), // Convert base64 to Buffer
        ACL: 'public-read'
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
