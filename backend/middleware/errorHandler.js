import {StatusCodes} from 'http-status-codes';

const errorHandlerMiddleware = async (err, req, res, next) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message
    })
}

export default errorHandlerMiddleware;