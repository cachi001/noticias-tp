🌟 TP Magninon

📌 Requisitos previos

Instalar:

Git

Node.js y npm

MySQL Server & MySQL Workbench

IntelliJ IDEA o cualquier IDE compatible con Spring Boot

🔹 Clonar el repositorio

Ejecuta el siguiente comando en la terminal:
```bash
git clone https://github.com/cachi001/noticias-tp.git
```
🔹 Configurar el Frontend

1️⃣ Abre la carpeta del frontend en Visual Studio Code o tu editor favorito.2️⃣ Instala las dependencias ejecutando:
```bash
npm install
```
3️⃣ Inicia la aplicación con:
```bash
npm run dev
```
4️⃣ Accede a la página en http://localhost:5173.

Si el puerto es diferente, cambiarlo en config/webConfig del backend.

🔹 Configurar y ejecutar el Backend

1️⃣ Abre la carpeta del backend en IntelliJ IDEA o cualquier IDE compatible con Spring Boot.2️⃣ Asegúrate de tener MySQL Workbench y MySQL Server instalados y en ejecución.3️⃣ Configura la conexión a la base de datos en el archivo application.properties:

spring.application.name=noticias-tp

spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/noticias-tp  # Nombre de la BD
spring.datasource.username=root  # Usuario
spring.datasource.password=1122  # Contraseña
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true

4️⃣ Ejecuta la aplicación desde IntelliJ IDEA.
