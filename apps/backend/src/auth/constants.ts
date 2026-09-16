import 'dotenv/config';

export const jwtConstants = {
  refreshSecret: process.env.JWT_REFRESH_SECRET as string,
  accessSecret: process.env.JWT_ACCESS_SECRET as string,
};
