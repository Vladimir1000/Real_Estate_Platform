CREATE DATABASE realestatedatabase;
CREATE USER realestateuser WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE realestatedatabase TO realestateuser;
-- ALTER DATABASE realestatedatabase OWNER TO realestateuser;