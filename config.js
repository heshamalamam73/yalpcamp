export default {
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://mido_2021:mido2014@cluster0.n2u08.mongodb.net/yalpcamp?retryWrites=true&w=majority",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "somethingscert",
};
