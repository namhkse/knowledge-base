docker run --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=your_secure_password \
  -p 3306:3306 \
  -v mysql_data:/var/lib/mysql \
  -d mysql:latest