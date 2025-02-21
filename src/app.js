const express = require('express');
const app = express();
const customerRoutes = require('./routes/customerRoutes');

app.use(express.json());
app.use('/api/customers', customerRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});