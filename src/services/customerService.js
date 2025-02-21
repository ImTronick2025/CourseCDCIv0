const { sql, poolPromise } = require('../db');

exports.getCustomers = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Customers');
  return result.recordset;
};

exports.getCustomerById = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM Customers WHERE CustomerID = @id');
  return result.recordset[0];
};

exports.createCustomer = async (customer) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('FirstName', sql.NVarChar, customer.FirstName)
    .input('LastName', sql.NVarChar, customer.LastName)
    .input('Email', sql.NVarChar, customer.Email)
    .input('Phone', sql.NVarChar, customer.Phone)
    .input('Address', sql.NVarChar, customer.Address)
    .input('City', sql.NVarChar, customer.City)
    .input('State', sql.NVarChar, customer.State)
    .input('ZipCode', sql.NVarChar, customer.ZipCode)
    .input('Country', sql.NVarChar, customer.Country)
    .input('IsPremium', sql.Bit, customer.IsPremium)
    .query('INSERT INTO Customers (FirstName, LastName, Email, Phone, Address, City, State, ZipCode, Country, IsPremium) OUTPUT INSERTED.* VALUES (@FirstName, @LastName, @Email, @Phone, @Address, @City, @State, @ZipCode, @Country, @IsPremium)');
  return result.recordset[0];
};

exports.updateCustomer = async (id, customer) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('CustomerID', sql.Int, id)
    .input('FirstName', sql.NVarChar, customer.FirstName)
    .input('LastName', sql.NVarChar, customer.LastName)
    .input('Email', sql.NVarChar, customer.Email)
    .input('Phone', sql.NVarChar, customer.Phone)
    .input('Address', sql.NVarChar, customer.Address)
    .input('City', sql.NVarChar, customer.City)
    .input('State', sql.NVarChar, customer.State)
    .input('ZipCode', sql.NVarChar, customer.ZipCode)
    .input('Country', sql.NVarChar, customer.Country)
    .input('IsPremium', sql.Bit, customer.IsPremium)
    .query('UPDATE Customers SET FirstName = @FirstName, LastName = @LastName, Email = @Email, Phone = @Phone, Address = @Address, City = @City, State = @State, ZipCode = @ZipCode, Country = @Country, IsPremium = @IsPremium OUTPUT INSERTED.* WHERE CustomerID = @CustomerID');
  return result.recordset[0];
};

exports.deleteCustomer = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request().input('id', sql.Int, id).query('DELETE FROM Customers OUTPUT DELETED.* WHERE CustomerID = @id');
  return result.recordset[0];
};