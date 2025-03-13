import { Guard, IPWARoutes } from '../../types/types';
import { Route } from 'react-router-dom';

const RoutesMapper = ({ routes, guard: Guard }: { routes: IPWARoutes; guard: Guard; }) => {
  return (
    Object.values(routes).map(
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
    )
  );
};
export default RoutesMapper;
