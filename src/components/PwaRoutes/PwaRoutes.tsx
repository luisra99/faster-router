import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { IPWARoutes, IPwaRoutesProps } from "../../types/types";
import PwaGuard from '../Guards/PwaGuard';
import { JSX } from "react";

/**
 * Función recursiva que genera rutas a partir de un objeto de rutas.
 * Maneja cualquier nivel de anidamiento a través de la propiedad subPath.
 * 
 * @param {IPWARoutes} routes - Objeto de rutas a procesar.
 * @param {string} parentPath - Ruta padre para construir rutas anidadas.
 * @param {any} Guard - Componente de guardia para proteger las rutas.
 * @returns {JSX.Element[]} Array de elementos Route de React Router.
 */
const renderRoutesRecursively = (
  routes: IPWARoutes,
  parentPath: string = "",
  Guard: any
): JSX.Element[] => {
  return Object.values(routes).flatMap(
    ({ path, component: Component, subPath }) => {
      const currentPath = `${parentPath}${path}` ;
      const routeElements: JSX.Element[] = [];
      // console.log("currentPath",currentPath)
      // Si hay un componente para esta ruta, añadirlo
      if (Component && currentPath) {
        routeElements.push(
          <Route
            key={currentPath}
            path={currentPath}
            element={
              <Guard.AuthGuard>
                <Component />
              </Guard.AuthGuard>
            }
          />
        );
      }

      // Si hay subrutas, procesarlas recursivamente
      if (subPath) {
        const nestedRoutes = renderRoutesRecursively(
          subPath,
          currentPath,
          Guard
        );
        routeElements.push(...nestedRoutes);
      }

      return routeElements;
    }
  );
};

/**
 * Componente que define las rutas de la aplicación web progresiva (PWA).
 * Utiliza React Router para gestionar las rutas y aplicar guardias de autenticación.
 * Soporta rutas anidadas de forma recursiva a través de la propiedad subPath.
 *
 * @param {IPwaRoutesProps} props - Props del componente.
 * @returns {JSX.Element} El componente que renderiza las rutas de la aplicación.
 */
const PwaRoutes = ({
  DashboardLayout,
  SignUpPage,
  SignInPage,
  LandingPage,
  NotFoundPage,
  CallBackUrlController,
  Guard = PwaGuard,
  routes,
}: IPwaRoutesProps): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Guard.AuthGuard>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </Guard.AuthGuard>
          }
        >
          {renderRoutesRecursively(routes, "", Guard)}
        </Route>
        <Route
          path={"sign-in"}
          element={
            <Guard.AnonymousGuard>
              <SignInPage />
            </Guard.AnonymousGuard>
          }
        />
        <Route
          path={"sign-up"}
          element={
            <Guard.AnonymousGuard>
              <SignUpPage />
            </Guard.AnonymousGuard>
          }
        />
        <Route
          path={"landing"}
          element={
            <Guard.AnonymousGuard>
              <LandingPage />
            </Guard.AnonymousGuard>
          }
        />
        <Route path="/create-session" element={<CallBackUrlController />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
export default PwaRoutes;
