const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const loggedDev = await Dev.findById(req.headers.user);
        const targetDev = await Dev.findById(req.params.devId);

        if (!targetDev)
            return res.status(400).json({ error: 'Dev not exists!' });

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};