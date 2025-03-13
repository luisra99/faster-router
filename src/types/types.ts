import { FC } from "react";
import { PathRouteProps } from "react-router-dom";

/**
 * Props personalizadas para las rutas de la aplicación.
 * @interface PathRouteCustomProps
 */
export type PathRouteCustomProps = {
  /**
   * Título opcional de la ruta.
   * @type {string}
   */
  title?: string;

  /**
   * Componente opcional que se renderiza para esta ruta.
   * @type {FC}
   */
  component?: FC;

  /**
   * Componente opcional que representa un ícono para la ruta.
   * @type {FC<SvgIconProps>}
   */
  icon?: FC<any>;

  /**
   * Subrutas asociadas a esta ruta, si existen.
   * @type {IPWARoutes}
   */
  subPath?: IPWARoutes;
};

/**
 * Tipo que define las rutas de la aplicación.
 * Este tipo es un objeto donde las claves son nombres de rutas y los valores son
 * combinaciones de propiedades de rutas de React Router y propiedades personalizadas.
 * @type {Record<string, PathRouteProps & PathRouteCustomProps>}
 */
export type IPWARoutes = Record<string, PathRouteProps & PathRouteCustomProps>;

/**

 * Props para el componente DashboardLayout.

 * @interface DashboardLayoutProps

 */

export interface DashboardLayoutProps {
  /** 

   * Los nodos hijos que se renderizarán dentro del componente DashboardLayout.

   * @type {React.ReactNode}

   */

  children: React.ReactNode; // Asegúrate de que 'children' esté definido aquí
}
/**
 * Props del componente PwaRoutes.
 * @interface
 */
export interface IPwaRoutesProps {
  /** Componente que se utiliza como diseño principal para las rutas protegidas. */
  DashboardLayout: React.FC<any>;

  /** Componente que se renderiza en la ruta de registro. */
  SignUpPage: React.ComponentType;

  /** Componente que se renderiza en la ruta de inicio de sesión. */
  SignInPage: React.ComponentType;

  /** Componente que se renderiza en la ruta de la página de aterrizaje. */
  LandingPage: React.ComponentType;

  /** Componente que se renderiza cuando no se encuentra la ruta solicitada. */
  NotFoundPage: React.ComponentType;

  /** Componente que maneja la lógica de redirección de URL de callback. */
  CallBackUrlController: React.ComponentType;

  /** Objeto que define las rutas de la aplicación y sus componentes asociados. */
  routes: IPWARoutes;

  /**
   * Objeto que contiene los guards de autenticación y anonimato.
   * @default PwaGuard
   */
  Guard?: Guard;
}

export type Guard = {
  AuthGuard: React.FC<{ children: React.ReactNode; }>;
  AnonymousGuard: React.FC<{ children: React.ReactNode; }>;
};