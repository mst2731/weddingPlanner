module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next)
            .catch((err) => {
                console.error('An error occurred: '+ err)
                next(err)
            })
    }
}