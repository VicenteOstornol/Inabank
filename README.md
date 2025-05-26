# Inabank

Una demo simple de autenticación con Vue.js + Firebase para registro e inicio de sesión de usuarios.

## Características

- Registro de usuarios (sign up) con email y contraseña
- Inicio de sesión (login) con email y contraseña
- Validación de formularios y manejo de errores
- Integración con Firebase Authentication
- Interfaz moderna con Tailwind CSS

## Estructura del proyecto

```
src/
  components/         # Componentes Vue
  firebase/           # Configuración de Firebase y helpers de autenticación
  router/             # Configuración de Vue Router
  stores/             # Pinia/Vuex stores (si se usan)
  views/              # Vistas principales (Login, Signup, Home, About)
  App.vue             # Componente principal
  main.js             # Punto de entrada de la app
```

## Configuración

1. **Clona el repositorio:**
   ```sh
   git clone <tu-url-del-repo>
   cd inabank
   ```
2. **Instala las dependencias:**
   ```sh
   npm install
   ```
3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto usando `.env.example` como referencia:
   ```
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```
   - Reemplaza los valores con los de tu proyecto de Firebase.
   - No compartas tu archivo `.env` ni lo subas a git.
4. **Ejecuta la app:**
   ```sh
   npm run dev
   ```

## Uso

- Visita `/signup` para crear una nueva cuenta.
- Visita `/login` para iniciar sesión con tus credenciales.

## Comandos útiles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Compila para producción
- `npm run test` — Ejecuta los tests (si están configurados)

## Licencia

MIT
