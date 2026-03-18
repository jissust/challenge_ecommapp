# Imagen base
FROM node:20

# Directorio de trabajo
WORKDIR /

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "app.js"]