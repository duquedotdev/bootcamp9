import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  await jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }
    req.userId = decoded.id;
    return next();
  });
};
