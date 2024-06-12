import configLocal from "./config.local";
import configProd from "./config.prod";

export default () => {

  const envConfig = {
    local: configLocal,
    prod: configProd,
  }[process.env.FM_SERVER_ENV as any];

  return Object.assign(
    {
      port: 3306,
      mysql: {
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'akk669115',
        database: 'code',
        synchronize: true,
      }
    },
    envConfig
  )
}