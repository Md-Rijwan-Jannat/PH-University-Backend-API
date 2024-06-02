import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

const config = {
  node_env: process.env.NODE_ENV,
  bd_url: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
  default_password: process.env.DEFAULT_PASSWORD,
  password_salt_rounds: process.env.PASSWORD_SALT,
};

export default config;
