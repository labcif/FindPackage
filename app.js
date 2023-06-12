const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const packageRoutes = require('./packageRoutes');

const app = express();
app.use(cors());

app.get('/checkADB', (req, res) => {
    packageRoutes.checkAdbConnection((error, connected) => {
        if (error) {
            res.status(500).json({ error: 'Error occurred while checking ADB connection' });
            return;
        }

        //return 200
        res.json({ connected });
    });
});
app.get('/packages/:appName', packageRoutes.searchPackages);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});