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
import RoutesMapper from "./RoutesMapper";

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
          <RoutesMapper guard={Guard} routes={routes} />
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
