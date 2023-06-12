const { exec } = require('child_process');

function searchPackages(req, res) {
    const appName = req.params.appName;
    exec('adb shell pm list packages -f', (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve packages' });
            return;
        }

        if (stderr) {
            res.status(500).json({ error: stderr });
            return;
        }

        const packageLines = stdout.split('\n');
        const packages = packageLines
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => {
                const match = line.match(/^package:(.*)=(.*)$/);
                if (match) {
                    return {
                        name: match[2],
                    };
                }
                return null;
            })
            .filter(pkg => pkg !== null && pkg.name.toLowerCase().includes(appName.toLowerCase()));

        res.json({ packages });
    });
}
function checkAdbConnection(callback) {
    exec('adb devices', (error, stdout, stderr) => {
        if (error) {
            callback(error, false);
            return;
        }

        if (stderr) {
            callback(new Error(stderr), false);
            return;
        }

        const devicesOutput = stdout.trim().split('\n');
        const connected = devicesOutput.length >= 2 && devicesOutput[1].endsWith('\tdevice');
        callback(null, connected);
    });
}

module.exports = {
    searchPackages,
    checkAdbConnection
};