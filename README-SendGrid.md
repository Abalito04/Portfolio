# Portfolio con Integración SendGrid

## 🚀 Configuración de SendGrid

### 1. Crear cuenta en SendGrid
1. Ve a [sendgrid.com](https://sendgrid.com)
2. Crea una cuenta gratuita (100 emails/día gratis)
3. Verifica tu email

### 2. Obtener API Key
1. En el dashboard de SendGrid, ve a **Settings** > **API Keys**
2. Crea una nueva API Key con permisos de **Mail Send**
3. Copia la API Key (solo se muestra una vez)

### 3. Verificar dominio/email
1. Ve a **Settings** > **Sender Authentication**
2. Verifica un dominio o email individual
3. Para emails individuales: agrega tu email de envío

### 4. Configurar variables de entorno
1. Copia `env.example` a `.env`
2. Completa las variables:

```env
SENDGRID_API_KEY=SG.tu_api_key_aqui
SENDGRID_FROM_EMAIL=tu_email_verificado@domain.com
YOUR_EMAIL=abalito95@gmail.com
PORT=3000
```

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start

# Para desarrollo (con auto-reload)
npm run dev
```

## 🌐 Despliegue

### Opción 1: Railway
1. Conecta tu repositorio a Railway
2. Agrega las variables de entorno en Railway
3. Deploy automático

### Opción 2: Heroku
1. Crea app en Heroku
2. Conecta repositorio
3. Agrega variables de entorno:
```bash
heroku config:set SENDGRID_API_KEY=tu_api_key
heroku config:set SENDGRID_FROM_EMAIL=tu_email
heroku config:set YOUR_EMAIL=abalito95@gmail.com
```

### Opción 3: Vercel
1. Conecta repositorio a Vercel
2. Agrega variables de entorno en el dashboard
3. Deploy

## ✨ Características

- ✅ Envío de emails profesionales
- ✅ Auto-respuesta al cliente
- ✅ Templates en español e inglés
- ✅ Validación de formulario
- ✅ Notificaciones de éxito/error
- ✅ Diseño responsive

## 📧 Flujo de Emails

1. **Cliente envía formulario** → Email llega a tu bandeja
2. **Auto-respuesta** → Cliente recibe confirmación automática
3. **Templates personalizados** → Emails con tu branding
4. **Multiidioma** → Emails en español o inglés según el idioma del sitio

## 🔧 Personalización

### Cambiar templates de email
Edita las secciones `emailTemplates` y `autoReplyTemplate` en `server.js`

### Cambiar colores
Los emails usan tu paleta de colores (#10b981 - verde)

### Agregar más campos
1. Actualiza el formulario HTML
2. Modifica el JavaScript para enviar nuevos campos
3. Actualiza el backend para procesar los nuevos datos

## 🛡️ Seguridad

- ✅ Validación de campos requeridos
- ✅ Sanitización de inputs
- ✅ Rate limiting (recomendado para producción)
- ✅ CORS configurado
- ✅ Variables de entorno para datos sensibles

## 📊 Monitoreo

SendGrid proporciona:
- Estadísticas de entrega
- Bounces y spam reports
- Análisis de engagement
- Logs de actividad

¡Tu portfolio ahora tiene un sistema de contacto profesional con SendGrid!
