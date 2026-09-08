# 🌌 AuraStudio 3D (v2.0 PRO)
Suite interactiva de visualización de audio 3D, ecualizador paramétrico y rack de efectos moduladores en tiempo real, optimizada para monetización con **Google AdSense**.

---

## 🚀 Opciones de Despliegue Rápido (100% Gratis)

### Opción 1: Netlify Drop (La más rápida - Sin cuenta de programador, 10 segundos)
1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta completa `aurastudio_deploy` (o el contenido descomprimido del archivo ZIP).
3. ¡Listo! Netlify te generará una URL pública instantánea segura con certificado SSL (ejemplo: `https://aurastudio-3d.netlify.app`).

---

### Opción 2: Vercel (Recomendada para producción con dominio propio)
1. Instala el CLI de Vercel o conéctalo desde tu cuenta de GitHub en [vercel.com](https://vercel.com).
2. Si usas la terminal en la carpeta del proyecto:
   ```bash
   npx vercel
   ```
3. Presiona Enter para confirmar las opciones por defecto. Vercel desplegará la web en una CDN global ultrarrápida.

---

### Opción 3: GitHub Pages
1. Crea un repositorio nuevo en GitHub (ejemplo: `aurastudio`).
2. Sube los archivos (`index.html`, `ads.txt`, `README.md`).
3. Ve a **Settings > Pages > Branch: main > Save**.
4. En 1 minuto tu web estará disponible en `https://tu-usuario.github.io/aurastudio`.

---

## 💰 Configuración de Google AdSense
1. Una vez que tu sitio tenga dominio o subdominio público, solicita tu cuenta en [Google AdSense](https://adsense.google.com/).
2. Abre `ads.txt` y reemplaza `pub-0000000000000000` con tu código de editor de AdSense.
3. En `index.html`, busca las secciones con las clases `ad-top-banner` y `ad-sidebar-slot` para insertar tu etiqueta `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">`.

---

## 🛠️ Estructura del Proyecto
```
aurastudio_deploy/
├── index.html        # Aplicación web completa independiente (WebGL + Web Audio API)
├── vercel.json       # Configuración de despliegue en Vercel
├── netlify.toml      # Configuración de despliegue en Netlify
├── ads.txt           # Verificación oficial para Google AdSense
├── package.json      # Servidor local de desarrollo
└── README.md         # Manual de despliegue
```
