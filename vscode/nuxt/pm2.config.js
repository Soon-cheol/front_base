module.exports = {
  apps: [
    {
      name: 'aram-user',
      cwd: __dirname,
      script: './server',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: '20101',
        // API_URL: 'https://www.minigate.kr:52443'
        baseURL: process.env.API_URL || 'http://210.223.45.233:8030'
      },
      watch: true,
      ignore_watch: ['client/static/*'],
      exec_mode: 'cluster',
      instances: 4,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
}
