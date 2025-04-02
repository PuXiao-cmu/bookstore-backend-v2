const customerService = require('../services/customerService');

exports.addCustomer = async (req, res) => {
  const c = req.body;

  const requiredFields = ['userId', 'name', 'phone', 'address', 'city', 'state', 'zipcode'];
  for (const field of requiredFields) {
    if (!c[field]) {
      return res.status(400).json({ message: `Missing required field: ${field}` });
    }
  }

  if (!customerService.isValidEmail(c.userId)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  if (!customerService.isValidState(c.state)) {
    return res.status(400).json({ message: 'Invalid state format.' });
  }

  try {
    const newCustomer = await customerService.addCustomer(c);
    res.status(201)
      .location(`/customers/${newCustomer.id}`)
      .json(newCustomer);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
  }
};

exports.getCustomerById = async (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid or missing ID.' });
  }

  try {
    const customer = await customerService.getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCustomerByUserId = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'Missing userId query parameter.' });
  }

  if (!customerService.isValidEmail(userId)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const customer = await customerService.getCustomerByUserId(userId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
