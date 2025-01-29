import express from 'express';
import { createClient } from 'redis';
import cors from 'cors';

const app = express();
const port = 3001;

const client = createClient();

client.on('error', err => {
  console.error('Redis error:', err);
});

client.connect().catch(console.error); // Ensure connection to Redis

// Allow requests from all origins (you can specify a specific origin instead of '*' if needed)
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.post('/employees', async (req, res) => {
  console.log('POST /employees called with body:', req.body);
  const { firstName, lastName, birthDate, position } = req.body;
  const id = Date.now().toString();
  const employee = { id, firstName, lastName, birthDate, position };
  try {
    await client.hSet('employees', id, JSON.stringify(employee));
    await client.lPush('employees_order', id);
    res.status(201).send(employee);
  } catch (err) {
    console.error('Error in POST /employees:', err);
    res.status(500).send(err);
  }
});

app.get('/employees', async (req, res) => {
  console.log('GET /employees called');
  try {
    const employeeIds = await client.lRange('employees_order', 0, -1);
    const employees = await Promise.all(
      employeeIds.map(id => client.hGet('employees', id))
    );
    const result = employees.map(emp => JSON.parse(emp));
    res.status(200).send(result);
  } catch (err) {
    console.error('Error in GET /employees:', err);
    res.status(500).send(err);
  }
});

app.get('/employees/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`GET /employees/${id} called`);
  try {
    const employee = await client.hGet('employees', id);
    if (!employee) {
      res.status(404).send('Employee not found');
    } else {
      res.status(200).send(JSON.parse(employee));
    }
  } catch (err) {
    console.error(`Error in GET /employees/${id}:`, err);
    res.status(500).send(err);
  }
});

app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /employees/${id} called`);
  try {
    await client.hDel('employees', id);
    await client.lRem('employees_order', 0, id);
    res.status(200).send('Employee deleted');
  } catch (err) {
    console.error(`Error in DELETE /employees/${id}:`, err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
