const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        try {
            const { user } = req.headers;

            const loggedDev = await Dev.findById(user);

            if (!loggedDev)
                return res.status(400).json({ 'error': 'User Logged not found!' });

            const devs = await Dev.find({
                $and: [
                    { _id: { $ne: user } },
                    { _id: { $nin: loggedDev.likes } },
                    { _id: { $nin: loggedDev.dislikes } }
                ]
            });
            return res.json(devs);
        } catch (e) {
            return res.status(500).json({ error: "Internal error api." })
        }
    },
    async store(req, res) {
        try {
            const { username } = req.body;

            const userExists = await Dev.findOne({ user: username });

            if (userExists)
                return res.json(userExists);

            const response = await axios.get(`https://api.github.com/users/${username}`);
            const { name, bio, avatar_url: avatar } = response.data;

            const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar: avatar
            });
            return res.json(dev);
        } catch (e) {
            return res.status(e.response.status).json({ error: e.response.statusText });
        }
    }
};