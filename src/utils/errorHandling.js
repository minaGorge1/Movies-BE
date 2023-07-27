

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            return next(new Error(err, { cause: 500 })) // new Error bdor 3la a5r madil war aly hia al error handling
        })
    }
}

export const globalErrorHandling = (err, req, res, next) => { // 4 bramittier tb2a error handling 
    if (err) {
        if (process.env.MOOD == "DEV") {
            return res.status(err.cause || 500).json({ message: err.message, err, stack: err.stack })
        }
        return res.status(err.cause || 500).json({ message: err.message })
    }
}