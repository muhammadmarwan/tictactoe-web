import axios from "./axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (email: string, password: string) => {
  const res = await axios.post("/auth/register", { email, password });
  return res.data;
};

export const getProfile = async () => {
  const res = await axios.get("/auth/profile");
  return res.data;
};

export const startGame = async (startPlayer: "user" | "computer") => {
  const res = await axios.post("/game/start", { startPlayer });
  return res.data;
};

export const makeMove = async (
  gameSessionId: string,
  row: number,
  col: number
) => {
  const res = await axios.post("/game/move", {
    gameSessionId,
    moveRow: row,
    moveCol: col,
    turn: "user",
  });
  return res.data;
};

export const getMyStats = async () => {
  const res = await axios.get("/game/stats/me");
  return res.data;
};
