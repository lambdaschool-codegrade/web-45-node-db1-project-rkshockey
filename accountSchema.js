const yup = require('yup')

const accountSchema = yup.object().shape({
    name: yup.string("name of account must be a string")
        .required("name and budget are required")
        .min(3, "name of account must be between 3 and 100")
        .max(100, "name of account must be between 3 and 100"),
    budget: yup.number("budget of account must be a number")
        .required("name and budget are required")
        .positive("budget of account is too large or too small")
        .lessThan(1000000, "budget of account is too large or too small")
})

module.exports = accountSchema