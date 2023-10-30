// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // Get the token from the request header Authorisation
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied, no token provided' });
  }

  try {
    // Verify the token using your secret
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the user id from the token to the request object
    req.userId = decoded.userId;
    req.username = decoded.username;


    // Continue to the protected route
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
