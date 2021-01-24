module.exports = {
  apps: [
    {
      name: `${process.env.SERVER_NAME || 'api'}-${process.env.API_ENV || 'local'}[${process.env.SERVER_PORT || 3000}]`,
      script: 'src/index.js',
      exec_mode: 'cluster',
      instances: 'max',
      // autorestart: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      max_memory_restart: '1G',
    },
  ],
};
