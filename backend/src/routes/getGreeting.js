const GREETING = 'FUCK WORLD!!!';

module.exports = async (req, res) => {
    res.send({
        greeting: GREETING,
    });
};
