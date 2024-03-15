const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        author_id: 'required|string',
        genre: 'required|string',
        published_year: 'required|integer',
        publisher: 'required|string',
        pages: 'required|integer',
        isbn: 'required|integer' // Ensure it is an array
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveAuthor = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        birthdate: 'required|string',
        nationality: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};


module.exports = {
    saveBook,
    saveAuthor
};
