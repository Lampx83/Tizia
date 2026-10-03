// Express 4 ignores the promise an async handler returns. Forward a rejection to next(err) for every layer,
// once, before any route runs (same idea as the express-async-errors package, without the dependency).
import Layer from 'express/lib/router/layer.js';

if (!Layer.prototype.__asyncPatched) {
  Layer.prototype.handle_request = function handleRequest(req, res, next) {
    const fn = this.handle;
    if (fn.length > 3) return next(); // error-handling middleware, not for this request
    try {
      const out = fn(req, res, next);
      if (out && typeof out.catch === 'function') out.catch(next);
    } catch (error) { next(error); }
  };
  Layer.prototype.__asyncPatched = true;
}
