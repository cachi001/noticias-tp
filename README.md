🌟 TP Noticias

📌 Requisitos previos

Instalar:

- Git
- Node.js y npm
- MySQL Server & MySQL Workbench
- IntelliJ IDEA o cualquier IDE compatible con Spring Boot

---

🔹 **Clonar el repositorio**

Ejecuta el siguiente comando en la terminal:
```bash
git clone https://github.com/cachi001/noticias-tp.git
```

---

🔹 **Configurar el Frontend**

1. Abre la carpeta del **frontend** en Visual Studio Code
2. Instala las dependencias ejecutando:
```bash
npm install
```
3. Inicia la aplicación con:
```bash
npm run dev
```
4. Accede a la página en `http://localhost:5173`.

Si el puerto es diferente, cambiarlo en `config/webConfig` del backend.

---

🔹 **Configurar y ejecutar el Backend**

1. Abre la carpeta del **backend** en IntelliJ IDEA.
2. Asegúrate de tener **MySQL Workbench** y **MySQL Server** instalados y en ejecución.
3. Configura la conexión a la base de datos en el archivo `application.properties`:

```properties
spring.application.name=noticias-tp

spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/noticias-tp  # Nombre de la BD
spring.datasource.username=root  # Usuario
spring.datasource.password=1122  # Contraseña
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
```

4. Ejecuten la aplicación desde IntelliJ IDEA.


EJEMPLO DE DATOS PARA CARGAR DESDE MYSQL

🔹 **EMPRESA**

```sql
INSERT INTO empresa (denominacion, domicilio, email, horario_atencion, latitud, longitud, quienes_somos, telefono)
VALUES
('AutoRepuestos S.A.', 'Calle Falsa 123, Ciudad, Provincia', 'contacto@autorepuestos.com', 'Lunes a Viernes de 9:00 a 18:00', -34.6037, -58.3816, 'En AutoRepuestos S.A. somos una empresa especializada en la venta de repuestos para vehículos con más de 20 años de experiencia en el sector.', '011-1234-5678'),
('TechInnovations', 'Av. Tecnológica 456, Parque Industrial, Ciudad', 'info@techinnovations.com', 'Lunes a Viernes de 8:30 a 17:30', -34.9037, -58.7336, 'TechInnovations es una empresa dedicada a la investigación y desarrollo de nuevas tecnologías para mejorar la calidad de vida de las personas.', '011-9876-5432'),
('Limpieza Total', 'Calle Higiene 789, Barrio Limón, Ciudad', 'ventas@limpiezatotal.com', 'Lunes a Sábado de 10:00 a 19:00', -34.6231, -58.4321, 'Limpieza Total ofrece productos de limpieza ecológicos y servicios profesionales para empresas y hogares.', '011-5432-8765'),
('Comercializadora Global', 'Ruta 12 Km 45, Ciudad', 'contacto@comercializadora-global.com', 'Lunes a Viernes de 9:00 a 17:00', -34.7000, -58.4000, 'Comercializadora Global es una empresa importadora y distribuidora de productos alimenticios y de consumo masivo a nivel internacional.', '011-2345-6789'),
('Soluciones Energéticas', 'Av. Solar 1010, Barrio Solar, Ciudad', 'contacto@solucionesenergeticas.com', 'Lunes a Viernes de 9:00 a 18:00', -34.9123, -58.6234, 'Soluciones Energéticas se especializa en la instalación de sistemas solares y energías renovables para hogares y empresas.', '011-1122-3344');
```

🔹 **NOTICIA**

```sql
INSERT INTO noticia (contenido_html, fecha_publicacion, imagen_noticia, publicada, resumen_noticia, titulo, id_empresa)
VALUES
('<p>Nuevo repuesto disponible para tu automóvil. ¡Visítanos para más información!</p>', '2025-03-01', 'https://images.pexels.com/photos/1029054/pexels-photo-1029054.jpeg', TRUE, 'Lanzamiento de nuevos repuestos para vehículos', 'Nuevo repuesto en AutoRepuestos S.A.', 1),
('<p>Estamos ampliando nuestro horario de atención durante el fin de semana.</p>', '2025-03-05', 'https://images.pexels.com/photos/768423/pexels-photo-768423.jpeg', TRUE, 'Ampliación del horario para mejor atención.', 'Horario extendido en AutoRepuestos S.A.', 1),
('<p>TechInnovations celebra 10 años en el mercado innovador de la tecnología.</p>', '2025-03-07', 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg', TRUE, 'Aniversario de TechInnovations con nuevos proyectos.', '10 años de innovación en TechInnovations', 2),
('<p>¡Nos mudamos! Ahora estamos en una ubicación más accesible para todos nuestros clientes.</p>', '2025-03-10', 'https://images.pexels.com/photos/2698515/pexels-photo-2698515.jpeg', TRUE, 'Mudanza de nuestras oficinas a un lugar más cómodo.', 'Nueva ubicación de TechInnovations', 2),
('<p>Importantes cambios en la legislación de productos de limpieza. Conoce cómo afecta a tu negocio.</p>', '2025-03-12', 'https://images.pexels.com/photos/2092997/pexels-photo-2092997.jpeg', TRUE, 'Cambios legislativos en productos de limpieza.', 'Noticias sobre legislación en Limpieza Total', 3),
('<p>La limpieza ecológica es el futuro: ofrecemos los productos más efectivos y seguros.</p>', '2025-03-15', 'https://images.pexels.com/photos/4171742/pexels-photo-4171742.jpeg', TRUE, 'Limpieza ecológica: ¿por qué elegir productos ecológicos?', 'La importancia de la limpieza ecológica', 3),
('<p>Comercializadora Global firma acuerdo con proveedores internacionales para aumentar su capacidad de distribución.</p>', '2025-03-18', 'https://images.pexels.com/photos/2092955/pexels-photo-2092955.jpeg', TRUE, 'Acuerdo estratégico con proveedores internacionales.', 'Nuevo acuerdo de Comercializadora Global', 4),
('<p>¡Tenemos una nueva línea de productos gourmet para tus consumidores!</p>', '2025-03-20', 'https://images.pexels.com/photos/3137369/pexels-photo-3137369.jpeg', TRUE, 'Lanzamiento de línea gourmet de productos.', 'Nuevos productos en Comercializadora Global', 4),
('<p>Soluciones Energéticas ofrece nuevas promociones de instalación de paneles solares para empresas.</p>', '2025-03-22', 'https://images.pexels.com/photos/1230521/pexels-photo-1230521.jpeg', TRUE, 'Promociones en instalación de sistemas solares.', 'Promociones de paneles solares en Soluciones Energéticas', 5),
('<p>¿Sabías que con energía solar puedes reducir hasta un 40% tu factura de electricidad?</p>', '2025-03-25', 'https://images.pexels.com/photos/3694557/pexels-photo-3694557.jpeg', TRUE, 'Ahorro en electricidad con energía solar.', 'Ahorra con energía solar', 5),
('<p>La expansión de nuestra empresa nos permite ofrecer mejores precios en todos nuestros productos.</p>', '2025-03-28', 'https://images.pexels.com/photos/3183174/pexels-photo-3183174.jpeg', TRUE, 'Expansión y mejores precios en productos.', 'Expansión de AutoRepuestos S.A.', 1),
('<p>¿Te gustaría conocer más sobre los repuestos de última tecnología que tenemos en stock?</p>', '2025-03-30', 'https://images.pexels.com/photos/2004160/pexels-photo-2004160.jpeg', TRUE, 'Últimos repuestos disponibles con tecnología avanzada.', 'Repuestos avanzados en AutoRepuestos S.A.', 1),
('<p>TechInnovations lanza su nueva aplicación móvil para facilitar la compra de productos tecnológicos.</p>', '2025-04-02', 'https://images.pexels.com/photos/3830556/pexels-photo-3830556.jpeg', TRUE, 'Nueva app móvil de TechInnovations.', 'Lanzamiento de app móvil en TechInnovations', 2),
('<p>Entérate de las últimas tendencias en tecnología y cómo impactan tu vida diaria.</p>', '2025-04-04', 'https://images.pexels.com/photos/3771839/pexels-photo-3771839.jpeg', TRUE, 'Tendencias tecnológicas y su impacto.', 'Tendencias en tecnología en TechInnovations', 2),
('<p>Nuevo estudio de mercado confirma la preferencia por los productos ecológicos de limpieza.</p>', '2025-04-06', 'https://images.pexels.com/photos/4206975/pexels-photo-4206975.jpeg', TRUE, 'Estudio confirma la preferencia por productos ecológicos.', 'Preferencia por limpieza ecológica en Limpieza Total', 3),
('<p>Estamos implementando una nueva estrategia de ventas online para llegar a más clientes.</p>', '2025-04-09', 'https://images.pexels.com/photos/4392243/pexels-photo-4392243.jpeg', TRUE, 'Estrategia de ventas online de Limpieza Total.', 'Ventas online en Limpieza Total', 3),
('<p>La firma de nuevos contratos con distribuidores internacionales permitirá a Comercializadora Global expandir aún más su alcance.</p>', '2025-04-11', 'https://images.pexels.com/photos/4095639/pexels-photo-4095639.jpeg', TRUE, 'Expansión de la empresa con nuevos contratos.', 'Nuevos contratos en Comercializadora Global', 4),
('<p>Soluciones Energéticas tiene una nueva línea de productos para pequeñas empresas que buscan ser más ecológicas.</p>', '2025-04-13', 'https://images.pexels.com/photos/2740539/pexels-photo-2740539.jpeg', TRUE, 'Productos para pequeñas empresas de Soluciones Energéticas.', 'Línea ecológica para pequeñas empresas en Soluciones Energéticas', 5),
('<p>Estamos ofreciendo consultorías personalizadas para empresas que desean cambiarse a la energía solar.</p>', '2025-04-15', 'https://images.pexels.com/photos/2792579/pexels-photo-2792579.jpeg', TRUE, 'Consultorías personalizadas para energías renovables.', 'Consultoría solar para empresas', 5),
('<p>¡Gracias a todos nuestros clientes por su continuo apoyo! Les tenemos sorpresas próximamente.</p>', '2025-04-18', 'https://images.pexels.com/photos/4041185/pexels-photo-4041185.jpeg', TRUE, 'Agradecimiento a los clientes de AutoRepuestos S.A.', 'Gracias por su apoyo en AutoRepuestos S.A.', 1),
('<p>TechInnovations lanza un programa de reciclaje tecnológico con el fin de cuidar el medio ambiente.</p>', '2025-04-20', 'https://images.pexels.com/photos/2064565/pexels-photo-2064565.jpeg', TRUE, 'Reciclaje tecnológico para un futuro sostenible.', 'Reciclaje tecnológico en TechInnovations', 2),
('<p>¡Nuestro servicio de entrega a domicilio ahora llega más rápido que nunca!</p>', '2025-04-22', 'https://images.pexels.com/photos/3332237/pexels-photo-3332237.jpeg', TRUE, 'Mejora en el servicio de entrega a domicilio.', 'Entrega más rápida en Limpieza Total', 3);
```
🔹 **NOTICIA**

```sql
INSERT INTO noticia (contenido_html, fecha_publicacion, imagen_noticia, publicada, resumen_noticia, titulo, id_empresa)
VALUES
('<p>Nuevo repuesto disponible para tu automóvil. ¡Visítanos para más información!</p>', '2025-03-01', 'https://images.pexels.com/photos/1029054/pexels-photo-1029054.jpeg', TRUE, 'Lanzamiento de nuevos repuestos para vehículos', 'Nuevo repuesto en AutoRepuestos S.A.', 1),
('<p>Estamos ampliando nuestro horario de atención durante el fin de semana.</p>', '2025-03-05', 'https://images.pexels.com/photos/768423/pexels-photo-768423.jpeg', TRUE, 'Ampliación del horario para mejor atención.', 'Horario extendido en AutoRepuestos S.A.', 1),
('<p>¡Nuevos servicios de reparación de motores! Ven a conocer nuestros precios.</p>', '2025-03-07', 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg', TRUE, 'Nuevos servicios de reparación en AutoRepuestos S.A.', 'Servicios de reparación de motores', 1),
('<p>Se implementa un nuevo sistema de reservas en línea para mejorar la atención.</p>', '2025-03-10', 'https://images.pexels.com/photos/2004160/pexels-photo-2004160.jpeg', TRUE, 'Sistema de reservas en línea para mayor comodidad.', 'Nuevo sistema de reservas online', 1),
('<p>AutoRepuestos S.A. ahora ofrece financiamiento para tus reparaciones.</p>', '2025-03-12', 'https://images.pexels.com/photos/2698515/pexels-photo-2698515.jpeg', TRUE, 'Financiamiento de reparaciones disponible ahora.', 'Financiamiento en AutoRepuestos S.A.', 1),
('<p>Recibe tus repuestos en menos de 24 horas con nuestro nuevo sistema de entrega.</p>', '2025-03-15', 'https://images.pexels.com/photos/4171742/pexels-photo-4171742.jpeg', TRUE, 'Entregas más rápidas en AutoRepuestos S.A.', 'Entrega en menos de 24 horas', 1),
('<p>Nuevo horario de atención especial durante los feriados para mejor atención.</p>', '2025-03-17', 'https://images.pexels.com/photos/3830556/pexels-photo-3830556.jpeg', TRUE, 'Horario especial para feriados en AutoRepuestos S.A.', 'Horario especial en feriados', 1),
('<p>Visítanos este mes y obtén un descuento en todas las reparaciones de frenos.</p>', '2025-03-20', 'https://images.pexels.com/photos/3183174/pexels-photo-3183174.jpeg', TRUE, 'Descuento en reparaciones de frenos este mes.', 'Descuento en reparaciones de frenos', 1),
('<p>Nuevo servicio de diagnóstico gratuito para tu automóvil. ¡No lo dejes pasar!</p>', '2025-03-22', 'https://images.pexels.com/photos/2092997/pexels-photo-2092997.jpeg', TRUE, 'Diagnóstico gratuito para tu vehículo.', 'Diagnóstico gratuito en AutoRepuestos S.A.', 1),
('<p>El nuevo catálogo de repuestos ya está disponible en nuestra página web.</p>', '2025-03-25', 'https://images.pexels.com/photos/3332237/pexels-photo-3332237.jpeg', TRUE, 'Catálogo online de repuestos actualizado.', 'Nuevo catálogo online en AutoRepuestos S.A.', 1),
('<p>¡Ya puedes pedir repuestos a través de WhatsApp! Servicio rápido y eficiente.</p>', '2025-03-28', 'https://images.pexels.com/photos/4206975/pexels-photo-4206975.jpeg', TRUE, 'Nuevo servicio de repuestos vía WhatsApp.', 'Pide repuestos por WhatsApp', 1),
('<p>Celebramos nuestro aniversario con grandes descuentos en repuestos seleccionados.</p>', '2025-03-30', 'https://images.pexels.com/photos/1230521/pexels-photo-1230521.jpeg', TRUE, 'Descuentos por nuestro aniversario.', 'Aniversario de AutoRepuestos S.A.', 1),
('<p>¿Sabías que cambiamos los aceites de tu vehículo en solo 30 minutos?</p>', '2025-04-02', 'https://images.pexels.com/photos/4095639/pexels-photo-4095639.jpeg', TRUE, 'Cambio rápido de aceites en AutoRepuestos S.A.', 'Cambio rápido de aceites', 1),
('<p>Ahora tenemos repuestos originales para todas las marcas de vehículos. Visítanos hoy.</p>', '2025-04-04', 'https://images.pexels.com/photos/2064565/pexels-photo-2064565.jpeg', TRUE, 'Repuestos originales para todos los vehículos.', 'Repuestos originales disponibles', 1),
('<p>Descubre nuestros paquetes de mantenimiento preventivo para tu automóvil.</p>', '2025-04-06', 'https://images.pexels.com/photos/2740539/pexels-photo-2740539.jpeg', TRUE, 'Paquetes de mantenimiento preventivo para autos.', 'Paquetes de mantenimiento preventivo', 1),
('<p>¡Tenemos promociones especiales para la compra de repuestos de transmisión!</p>', '2025-04-09', 'https://images.pexels.com/photos/3792187/pexels-photo-3792187.jpeg', TRUE, 'Promociones en repuestos de transmisión.', 'Descuento en repuestos de transmisión', 1),
('<p>Ahora ofrecemos kits de reparación para los vehículos más populares. ¡Más fácil que nunca!</p>', '2025-04-11', 'https://images.pexels.com/photos/3771839/pexels-photo-3771839.jpeg', TRUE, 'Kits de reparación para vehículos populares.', 'Kits de reparación de autos populares', 1),
('<p>Hemos mejorado nuestras instalaciones para brindarte un mejor servicio.</p>', '2025-04-13', 'https://images.pexels.com/photos/2792579/pexels-photo-2792579.jpeg', TRUE, 'Instalaciones mejoradas en AutoRepuestos S.A.', 'Mejoras en nuestras instalaciones', 1),
('<p>Visítanos este mes y lleva una sorpresa especial con tu compra de repuestos.</p>', '2025-04-15', 'https://images.pexels.com/photos/4392243/pexels-photo-4392243.jpeg', TRUE, 'Sorpresas con tu compra este mes.', 'Sorpresa en tu compra de repuestos', 1),
('<p>Contamos con el servicio de reparación de carrocería para todos los modelos de vehículos.</p>', '2025-04-18', 'https://images.pexels.com/photos/4095639/pexels-photo-4095639.jpeg', TRUE, 'Servicio de reparación de carrocería disponible.', 'Reparación de carrocería en AutoRepuestos S.A.', 1);
```

algunas fotos no cargan
