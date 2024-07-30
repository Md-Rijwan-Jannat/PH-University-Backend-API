import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

const config = {
  node_env: process.env.NODE_ENV,
  bd_url: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
  default_password: process.env.DEFAULT_PASSWORD,
  password_salt_rounds: process.env.PASSWORD_SALT,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  reset_link_url: process.env.RESET_LINK_URL,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_API_SECRET,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};

export default config;
