module.exports = {
  apps: [{
    name: "snippets-app",
    script: "./src/server.js",
    env: {
      PORT: 8080,
        DB_URI: 'mongodb://localhost:27019/snippets',
        BASE_URL: '/snippets-app/',
        NODE_ENV: 'production',
        SESSION_NAME: 'snippet_session',
        SESSION_SECRET: 'k3EDHL4MFDEaEtXNaNkCBb4BjP3kDhG',
     }
  }]
}