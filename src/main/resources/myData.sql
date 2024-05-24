-- Insert values into 'app_user' table
INSERT INTO app_user (id, name, email) VALUES
(1, 'Alice', 'alice@example.com'),
(2, 'Bob', 'bob@example.com');

-- Insert values into 'category' table
INSERT INTO category (id, name, user_id) VALUES
(1, 'Food', 1),
(2, 'Transportation', 1),
(3, 'Entertainment', 2);

-- Insert values into 'expense' table
INSERT INTO expense (id, expense_date, description, category_id, user_id) VALUES
(1, '2024-05-23 12:00:00', 'Lunch at restaurant', 1, 1),
(2, '2024-05-22 08:30:00', 'Bus ticket', 2, 1),
(3, '2024-05-21 20:00:00', 'Movie ticket', 3, 2);
