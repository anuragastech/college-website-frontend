const jwt = require('jsonwebtoken');
const Student = require('../');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Find student by ID
    const student = await Student.findById(decoded.id);
    if (!student) {
      return res.status(401).json({ message: 'Student not found' });
    }

    req.user = student; // ✅ Attach student data to req.user
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = protect;
