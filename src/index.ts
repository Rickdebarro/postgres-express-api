import 'dotenv/config';
import express from 'express';
import cors from 'cors';


import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.status(200).json({ message: 'API de Autenticação e Tarefas (PostgreSQL) está a funcionar!' });
});

export default app;
