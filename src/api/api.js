import axios from "axios";
import jwt from "jwt-simple";
import { v4 as uuidv4 } from "uuid";
import { SignJWT } from "jose";

// const ACCESS_KEY = import.meta.env.VITE_UPBIT_ACCESS_KEY;
const ACCESS_KEY = "a8y4wDQbLBPmufHD39xWcOx17CrPqW3sFjd6HwxR";
// const SECRET_KEY = import.meta.env.VITE_UPBIT_SECRET_KEY;
const SECRET_KEY = "5LYTLTVmF0PDpxE8RJOFMIBKv3Uj4KiCCAEJaymP";
const SERVER_URL = "https://api.upbit.com";

export const generateJwtToken = async () => {
  const payload = {
    access_key: ACCESS_KEY,
    nonce: uuidv4(), //uuid 랜덤 생성
  };

  console.log("payload : ", payload);

  //   const token = jwt.encode(payload, SECRET_KEY);
  const token = await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
      type: "JWT",
    })
    .sign(new TextEncoder().encode(SECRET_KEY));
  console.log("token 1 : ", token);

  return token;
};

//계좌조회 응답데이터 반환
export const getAccounts = async () => {
  try {
    const token = await generateJwtToken();
    console.log("token : ", token);
    const response = await axios.get(`${SERVER_URL}/v1/accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {}
};
