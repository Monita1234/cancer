const routes = new Map();

export function register(path, handler) { routes.set(path, handler); }

export function startRouter() {
  const go = () => {
    const [, route=""] = location.hash.split("#/");
    const handler = routes.get(route) || routes.get("dashboard");
    handler?.();
  };
  addEventListener("hashchange", go);
  go();
}
