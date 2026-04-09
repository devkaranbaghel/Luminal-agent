import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "access_secret_change_me",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh_secret_change_me",
    accessExpire: "15m",
    refreshExpire: "7d",
  },
  dbUrl: process.env.DATABASE_URL,
  env: process.env.NODE_ENV || "development",
};
