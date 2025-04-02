module.exports = function validateJWT(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }
  
    const token = auth.split(' ')[1];
    const [header, payload] = token.split('.');
    try {
      const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString());
      
      if (!decoded.sub || !decoded.iss || !decoded.exp) {
        return res.status(401).json({ message: 'Missing claims in token' });
      }
      
      const allowedSubs = ['starlord', 'gamora', 'rocket', 'drax', 'groot'];
      if (!allowedSubs.includes(decoded.sub)) {
        return res.status(401).json({ message: 'Invalid sub' });
      }
  
      if (decoded.iss !== 'cmu.edu') {
        return res.status(401).json({ message: 'Invalid issuer' });
      }
  
      if (decoded.exp * 1000 < Date.now()) {
        return res.status(401).json({ message: 'Token expired' });
      }
  
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token format' });
    }
  };
  