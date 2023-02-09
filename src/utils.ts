import { ALL_METHODS_COUNT, type Route } from './types';

export function pick<T = any>(obj: T, keys: Array<keyof T>): T {
  const ret = {} as T;

  for (const key of keys) {
    ret[key] = obj[key];
  }

  return ret;
}

export function getRoutes(app: any): Route[] {
  let routes: any[] = [];

  // Express 3
  if (app.routes) {
    routes = Object.values(app.routes).flat();

    // Count duplicated paths (for ALL routes)
    const pathsFromAllMethods: string[] = [];

    routes.forEach((item) => {
      const total = routes.reduce(
        (total: number, it) => total + (item.path === it.path ? 1 : 0),
        0
      );

      if (
        total === ALL_METHODS_COUNT &&
        !pathsFromAllMethods.includes(item.path)
      ) {
        pathsFromAllMethods.push(item.path);
      }
    });

    // Clear 'all' routes
    routes = routes.filter((item) => !pathsFromAllMethods.includes(item.path));

    // Add 'all' treated routes
    const allMethods = pathsFromAllMethods.map((item) => ({
      path: item,
      method: 'all'
    }));

    routes = routes.concat(allMethods);
  }

  // Express 4/5
  else if (app._router?.stack ?? app.router?.stack) {
    routes = (app._router ?? app.router).stack
      .map(
        (item: any) =>
          item.route ?? item.handle.stack?.map((item: any) => item.route)
      )
      .flat()
      .filter(Boolean);

    routes = routes.map((item: any) => ({
      path: item.path,
      method: item.stack.length === 1 ? item.stack[0].method : 'all'
    }));
  }

  routes = routes.map((item: any) => pick<Route>(item, ['path', 'method']));

  return routes;
}
