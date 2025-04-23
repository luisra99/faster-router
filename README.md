# Faster Router

Faster Router es un módulo de enrutamiento diseñado para aplicaciones web progresivas (PWA) que utilizan React. Proporciona un conjunto de componentes y utilidades para gestionar rutas, proteger rutas con guards de autenticación y anonimato, y definir un diseño común para las rutas protegidas.

## Instalación

Para instalar Faster Router en tu proyecto, ejecuta el siguiente comando:

```bash
npm install faster-router-pwa
```

## Uso

### Configuración básica

Faster Router proporciona un componente principal llamado `PwaRoutes` que gestiona las rutas de la aplicación. Para utilizarlo, debes pasarle un conjunto de props que definen los componentes de las rutas y los guards de autenticación.

```tsx
import React from 'react';
import { PwaRoutes } from 'faster-router-pwa';
import DashboardLayout from './components/DashboardLayout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import CallBackUrlController from './components/CallBackUrlController';
import { IPWARoutes } from 'faster-router-pwa/types';

const routes: IPWARoutes = {
  home: {
    path: '/',
    component: HomePage,
    title: 'Home',
  },
  profile: {
    path: '/profile',
    component: ProfilePage,
    title: 'Profile',
  },
};

const App = () => (
  <PwaRoutes
    DashboardLayout={DashboardLayout}
    SignInPage={SignInPage}
    SignUpPage={SignUpPage}
    LandingPage={LandingPage}
    NotFoundPage={NotFoundPage}
    CallBackUrlController={CallBackUrlController}
    routes={routes}
  />
);

export default App;
```

### Guards de Autenticación y Anonimato

Faster Router incluye dos guards por defecto: `AuthGuard` y `AnonymousGuard`. Estos guards se utilizan para proteger rutas que requieren autenticación o que deben ser accesibles solo para usuarios no autenticados, respectivamente.

```tsx
import { AuthGuard, AnonymousGuard } from 'faster-router-pwa';

// Ejemplo de uso de AuthGuard
<AuthGuard>
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
</AuthGuard>

// Ejemplo de uso de AnonymousGuard
<AnonymousGuard>
  <SignInPage />
</AnonymousGuard>
```

### Definición de Rutas

Las rutas se definen utilizando el tipo `IPWARoutes`, que es un objeto donde las claves son nombres de rutas y los valores son combinaciones de propiedades de rutas de React Router y propiedades personalizadas.

```tsx
import { IPWARoutes } from 'faster-router-pwa/types';

const routes: IPWARoutes = {
  home: {
    path: '/',
    component: HomePage,
    title: 'Home',
  },
  profile: {
    path: '/profile',
    component: ProfilePage,
    title: 'Profile',
  },
};
```

### Componentes Exportados

- **PwaRoutes**: Componente principal que define las rutas de la aplicación.
- **AuthGuard**: Guard que protege rutas que requieren autenticación.
- **AnonymousGuard**: Guard que protege rutas que deben ser accesibles solo para usuarios no autenticados.

### Tipos Exportados

- **IPWARoutes**: Tipo que define las rutas de la aplicación.
- **IPwaRoutesProps**: Props para el componente `PwaRoutes`.
- **PathRouteCustomProps**: Props personalizadas para las rutas de la aplicación.
- **DashboardLayoutProps**: Props para el componente `DashboardLayout`.
- **Guard**: Tipo que define los guards de autenticación y anonimato.

## Scripts de Desarrollo

- **build**: Compila el proyecto.
- **check**: Verifica el código con Biome y aplica correcciones.
- **dev**: Compila el proyecto en modo de desarrollo con observación de cambios.
- **format**: Formatea el código con Biome.

## Dependencias

- **react**: ^18.0.0
- **react-dom**: ^18.0.0
- **react-router-dom**: ^7.0.0
- **universal-cookie**: ^7.2.2

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añade nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo [LICENSE](https://github.com/luisra99/faster-router-pwa/blob/main/LICENSE) para más detalles.

## Enlaces

- [Repositorio en GitHub](https://github.com/luisra99/faster-router-pwa)
- [Documentación](https://github.com/luisra99/faster-router-pwa#readme)

---

Este módulo está diseñado para facilitar la gestión de rutas en aplicaciones React, especialmente en el contexto de PWAs. Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio. ¡Gracias por usar Faster Router!