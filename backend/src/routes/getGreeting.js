const GREETING = 'FUCKING THE WHOLE WORLD!!!';

module.exports = async (req, res) => {
    res.send({
        greeting: GREETING,
    });
};
