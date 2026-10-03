// Express 4 does not catch a rejected promise from an async handler: forward it to next().
// Wraps the last handler of each route; middleware before it are untouched.
export function asyncRoutes(router) {
  const wrap = (method) => (path, ...handlers) => {
    const last = handlers.pop();
    return router[method](path, ...handlers, (req, res, next) => Promise.resolve(last(req, res, next)).catch(next));
  };
  return { get: wrap('get'), post: wrap('post'), delete: wrap('delete') };
}
