module.exports = {
  apps : [{
    name: 'jianzhu',
    append_env_to_name: true,
    script: './server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'pro'
    },
    env_production: {
      NODE_ENV: 'demo'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'https://github.com/liuen12/jianzhu',
      path : '/home/jianzhu_dev',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env demo'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env pro',
      env  : {
        NODE_ENV: 'pro'
      }
    }
  }
};
