const { createProxyMiddleware } = require('http-proxy-middleware');
const { endpoint } = require('./constants');

module.exports = function (app) {
  app.use(
    endpoint,
    createProxyMiddleware({
      target: process.env.WDK_SERVICE_URL,
      pathRewrite: { [`^${endpoint}`]: '' },
      secure: false,
      changeOrigin: true,
      followRedirects: true,
      logLevel: 'debug',
      onProxyReq(proxyReq, req, res) {
        if (proxyReq._isRedirect) return;
        const authCookie = `auth_tkt=${process.env.VEUPATHDB_AUTH_TKT}`;
        const cookieRaw = proxyReq.getHeader('cookie');
        const cookies =
          cookieRaw == null
            ? authCookie
            : Array.isArray(cookieRaw)
            ? [...cookieRaw, authCookie]
            : [cookieRaw, authCookie];
        proxyReq.setHeader('cookie', cookies);
      },
    })
  );
  app.use(
    '/eda-service',
    createProxyMiddleware({
      target: process.env.EDA_SERVICE_URL,
      pathRewrite: { [`^/eda-service`]: '' },
      secure: false,
      changeOrigin: true,
      followRedirects: true,
      logLevel: 'debug',
    })
  );
  app.use(
    '/eda-data-service',
    createProxyMiddleware({
      target: process.env.EDA_DATA_SERVICE_URL,
      pathRewrite: { [`^/eda-data-service`]: '' },
      secure: false,
      changeOrigin: true,
      followRedirects: true,
      logLevel: 'debug',
    })
  );
};
