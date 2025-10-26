import app from './index'; 
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[Docker] Server is running on port ${PORT}`);
});