const firstMiddle = (req, res, next) => {
    console.log('Hello from middleware', new Date().toTimeString());
    next();
  };
  
  const bodyLooger = (req, res, next) => {
    // patikrinti ar route metodas yra put, post, patch
    console.log('req.method ===', req.method);
    // ['PUT', 'POST', 'PATCH'].includes(req.method);
    // if (req.method === 'PUT' || req.method === 'POST' || req.method === 'PATCH') {
    if (['PUT', 'POST', 'PATCH'].includes(req.method)) {
      console.log('req.body ===', req.body);
    }
    next();
  };
  
  const validateUser = (req, res, next) => {
    const { name, town, isDriver } = req.body;
  
    // mini validation
    if (name.trim().length === 0) {
      res.status(400).json({
        field: 'name',
        error: 'name required field',
      });
      return;
    }
    if (town.trim().length === 0) {
      res.status(400).json({
        field: 'town',
        error: 'town required field',
      });
      return;
    }
    if (name.trim().length < 3) {
      res.status(400).json({
        field: 'name',
        error: 'name must be 3 letters or more',
      });
      return;
    }
  
    // klaidu nera
    next();
  };
  
  module.exports = {
    firstMiddle,
    bodyLooger,
    validateUser,
  };