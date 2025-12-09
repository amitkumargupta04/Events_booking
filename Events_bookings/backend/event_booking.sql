-- =============================================
-- Event Booking Database Schema
-- Backend: Node.js + MySQL
-- =============================================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS event_booking;
USE event_booking;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','user') DEFAULT 'user'
);

-- 3. Events Table
CREATE TABLE IF NOT EXISTS events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  date DATETIME,
  total_seats INT,
  available_seats INT,
  price DECIMAL(10,2),
  img VARCHAR(255)
);

-- 4. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT,
  name VARCHAR(255),
  email VARCHAR(255),
  mobile VARCHAR(20),
  quantity INT,
  total_amount DECIMAL(10,2),
  booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- 5. Sample Data (Optional)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', 'hashed_password_here', 'admin'),
('John Doe', 'john@example.com', 'hashed_password_here', 'user');

INSERT INTO events (title, description, location, date, total_seats, available_seats, price, img) VALUES
('Music Concert', 'Live music event', 'New York', '2025-12-20 19:00:00', 100, 100, 499.99, 'https://example.com/concert.jpg'),
('Art Workshop', 'Painting and drawing workshop', 'Los Angeles', '2025-12-22 10:00:00', 50, 50, 299.99, 'https://example.com/art.jpg');

