import { OAuth2Client } from "google-auth-library";
import config from "../../config";

const clinet = new OAuth2Client(config.google_client_id);

// verify google token
export const verifyGoogleToken = async (token: string) => {
  const ticket = await clinet.verifyIdToken({
    idToken: token,
    audience: config.google_client_id,
  });
  const payload = ticket.getPayload();
  return {
    email: payload?.email,
    name: payload?.name,
    sub: payload?.sub, // unique google id
  };
};
