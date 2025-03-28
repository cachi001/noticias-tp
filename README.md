# TP magninon

Primero clonar el repositorio con " git clone https://github.com/cachi001/noticias-tp.git "

despues abrir frontend en visual y colocar " npm install " para instalar las dependencias y abrir la pagina con " npm run dev " (localHost:5173) si es distinto cambiarlo en config/webConfig del backend

el backend abrirlo con intellij y ejecutarlo tienen q tener mysql workbench instalado y mysql server en aplication properties sale

spring.application.name=noticias-tp

spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/noticias-tp (nombre de la bd)
spring.datasource.username=root (user)
spring.datasource.password=1122 (pass)
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql: true

