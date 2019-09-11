module.exports = {
  apps : [{
    name: 'jianzhu',
    append_env_to_name: true,
    script: './server.js',
    exec_mode: "cluster_mode",    
    instances: "max",
    max_memory_restart: 8,   
    autorestart: true,
    watch: false,
    env: {
      "NODE_ENV": "production",                // 环境参数，当前指定为生产环境 process.env.NODE_ENV
      "REMOTE_ADDR": "爱上大声地"               // process.env.REMOTE_ADDR
    },
    env_dev: {
        "NODE_ENV": "development",              // 环境参数，当前指定为开发环境 pm2 start server.js -- env_dev
        "REMOTE_ADDR": ""
    },
    env_test: {                               // 环境参数，当前指定为测试环境 pm2 start server.js -- env_test
        "NODE_ENV": "test",
        "REMOTE_ADDR": ""
    }
  }],
  deploy : {
    production : {
      user : 'root',
      host : '106.15.74.152',
      ref  : 'origin/master',
      repo : 'https://github.com/liuen12/jianzhu',
      path : '/home/jianzhu',
      'post-deploy' : 'cnpm install && npm run build && pm2 reload ecosystem.config.js --env production'
    },
    test : {
      user : 'root',
      host : '106.15.74.152',
      ref  : 'origin/dev',
      repo : 'https://github.com/liuen12/jianzhu',
      path : '/home/jianzhu_dev',
      'post-deploy' : 'cnpm install && pm2 reload ecosystem.config.js --env test',
    }
  }
};
