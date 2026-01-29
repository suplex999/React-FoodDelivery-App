CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50),
  amount DECIMAL(10,2),
  order_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
