CREATE DATABASE IF NOT EXISTS jsguru CHARACTER SET  utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jsguru;
SELECT * from information_schema.user_privileges;
CREATE USER IF NOT EXISTS 'jsguru'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT ALL PRIVILEGES ON jsguru.* TO 'jsguru'@'localhost';
FLUSH PRIVILEGES;