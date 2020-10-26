import jwt from "jsonwebtoken";

const generateToken = (id: string): string => {
  const signedToken = jwt.sign({ id }, <string>process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return signedToken;
};

export default generateToken;
