# 1. Usar la imagen oficial ligera de Node.js moderna basada en Alpine Linux
FROM node:20-alpine

# 2. Definir variables de entorno de producción
ENV NODE_ENV=production
ENV PORT=3000

# 3. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 4. Crear un grupo y usuario no-root para seguridad en producción
RUN addgroup -S nodejs && adduser -S nodeapp -G nodejs

# 5. Copiar los archivos del proyecto al contenedor
COPY --chown=nodeapp:nodejs index.html ./
COPY --chown=nodeapp:nodejs styles.css ./
COPY --chown=nodeapp:nodejs app.js ./
COPY --chown=nodeapp:nodejs sw.js ./
COPY --chown=nodeapp:nodejs manifest.json ./
COPY --chown=nodeapp:nodejs server.js ./

# 6. Cambiar al usuario no-root de seguridad
USER nodeapp

# 7. Exponer el puerto 3000 (el predeterminado de nuestro server.js)
EXPOSE 3000

# 8. Ejecutar la aplicación en Node.js
CMD ["node", "server.js"]
