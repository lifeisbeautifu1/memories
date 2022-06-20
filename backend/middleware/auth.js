import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  )
    return res.send(400).json({ message: 'token not provided' });
  const token = req.headers.authorization.split(' ')[1];
  let decodedData;
  if (token.length > 500) {
    decodedData = jwt.decode(token);
    req.userId = decodedData?.sub;
  } else {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;
  }
  next();
};

export default auth;
