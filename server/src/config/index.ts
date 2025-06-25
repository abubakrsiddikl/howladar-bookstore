import dotenv from "dotenv";

dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  jwt_secret: process.env.JWT_SECRET as string,
  google_client_id: process.env.GOOGLE_CLIENT_ID as string,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
  google_redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
  client_url: process.env.CLIENT_URL as string,
};
