const customerService = require('../services/customerService');

exports.getCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await customerService.deleteCustomer(req.params.id);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};