module.exports = {
  apps: [
    {
      name: 'aram-books',
      cwd: __dirname,
      script: './server',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: ''
        // API_URL: 'https://www.minigate.kr:52443'
        // baseURL: process.env.API_URL || 'http://210.223.45.233:8030'
      },
      watch: true,
      exec_mode: 'cluster',
      instances: 4,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
}
