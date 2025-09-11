# Portfolio con Integración EmailJS

## 🚀 **¡Listo para usar!**

Tu portfolio ya está configurado con EmailJS. Solo necesitas configurar el template en tu cuenta de EmailJS.

## 📧 **Configuración del Template en EmailJS**

### 1. **Ve a tu dashboard de EmailJS**
- Inicia sesión en [emailjs.com](https://emailjs.com)

### 2. **Crear Template**
- Ve a **Email Templates** → **Create New Template**
- Usa el **Template ID**: `template_gb96yxp`

### 3. **Configurar el Template**

**Template Name**: `Portfolio Contact Form`

**Subject**: 
```
Nuevo mensaje de contacto: {{subject}}
```

**Content** (copia y pega esto):
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #10b981; margin: 0;">Nuevo Mensaje de Contacto</h1>
        <p style="color: #6b7280; margin: 10px 0 0 0;">Portfolio - Matias Abalo</p>
    </div>
    
    <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #10b981;">
        <h3 style="color: #1f2937; margin: 0 0 15px 0;">Información del Cliente</h3>
        <p style="margin: 8px 0; color: #4b5563;"><strong>Nombre:</strong> {{name}}</p>
        <p style="margin: 8px 0; color: #4b5563;"><strong>Email:</strong> {{email}}</p>
        <p style="margin: 8px 0; color: #4b5563;"><strong>Asunto:</strong> {{subject}}</p>
    </div>
    
    <div style="background-color: #ffffff; padding: 25px; border: 1px solid #e5e7eb; border-radius: 12px; margin: 20px 0;">
        <h3 style="color: #1f2937; margin: 0 0 15px 0;">Mensaje</h3>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #f3f4f6;">
            <p style="line-height: 1.6; color: #374151; margin: 0; white-space: pre-line;">{{message}}</p>
        </div>
    </div>
    
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0;">
        <h3 style="margin: 0 0 10px 0; font-size: 18px;">📧 Mensaje desde Portfolio Web</h3>
        <p style="margin: 0; opacity: 0.9;">Cliente interesado en tus servicios</p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; margin: 0; font-size: 14px;">
            Enviado desde tu portfolio web • {{language}} • {{to_email}}
        </p>
    </div>
</div>
```

### 4. **Variables del Template**
Asegúrate de que estas variables estén disponibles:
- `{{name}}` - Nombre del cliente
- `{{email}}` - Email del cliente  
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Mensaje del cliente
- `{{language}}` - Idioma del sitio (es/en)
- `{{to_email}}` - Tu email (abalito95@gmail.com)

## ✅ **¡Ya está todo listo!**

### **Características implementadas**:
- ✅ **200 emails/mes gratis**
- ✅ **Sin servidor necesario**
- ✅ **Templates profesionales**
- ✅ **Multiidioma** (español/inglés)
- ✅ **Notificaciones de éxito/error**
- ✅ **Validación de formulario**
- ✅ **Diseño responsive**

### **Flujo de funcionamiento**:
1. **Cliente llena formulario** → Datos se envían a EmailJS
2. **EmailJS procesa** → Envía email a tu bandeja
3. **Notificación** → Cliente ve mensaje de éxito
4. **Formulario se limpia** → Listo para nuevo mensaje

## 🧪 **Probar el formulario**:
1. Abre tu portfolio en el navegador
2. Ve a la sección "Contacto"
3. Llena el formulario con datos de prueba
4. Envía el mensaje
5. Revisa tu email (abalito95@gmail.com)

## 🔧 **Personalización**:
- **Cambiar tu email**: Edita `to_email: 'abalito95@gmail.com'` en `script.js`
- **Modificar template**: Edita el template en EmailJS dashboard
- **Cambiar colores**: Modifica los colores en el template HTML

¡Tu portfolio ahora tiene un sistema de contacto profesional y completamente gratuito!
