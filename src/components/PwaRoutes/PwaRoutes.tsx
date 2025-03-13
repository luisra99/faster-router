import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { IPwaRoutesProps } from "../../types/types";
import PwaGuard from '../Guards/PwaGuard';
import { JSX } from "react";

/**
 * Componente que define las rutas de la aplicación web progresiva (PWA).
 * Utiliza React Router para gestionar las rutas y aplicar guardias de autenticación.
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
          {Object.values(routes).map(
            ({ path, component: Component, subPath }) => {
              if (Component && path) {
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <Guard.AuthGuard>
                        <Component />
                      </Guard.AuthGuard>
                    }
                  />
                );
              }

              return (
                subPath &&
                Object.values(subPath).map(
                  ({ path: childPath, component: ChildComponent }) => {
                    if (ChildComponent && path && childPath) {
                      const completePath = `${path}${childPath}`;
                      return (
                        <Route
                          key={completePath}
                          path={completePath}
                          element={
                            <Guard.AuthGuard>
                              <ChildComponent />
                            </Guard.AuthGuard>
                          }
                        />
                      );
                    }
                    return null;
                  }
                )
              );
            }
          )}
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
