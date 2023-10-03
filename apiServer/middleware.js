const CheckProgram = (req, res, next) => {
    const validPrograms = ['nodejs', 'python', 'product'];

    if (!validPrograms.includes(req.body.program)) {
        return res.status(422).json({
            data: null,
            error: 'Invalid program'
        });
    }

    next()
}

module.exports = { CheckProgram }