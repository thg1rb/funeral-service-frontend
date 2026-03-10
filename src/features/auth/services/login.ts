import bcrypt from "bcryptjs";
import { INITIAL_USER } from "../data/user";

export const login = async (username: string, password: string): Promise<boolean> => {
  const userRaw = localStorage.getItem('super-user')
  let pass = false;
  let user;
  if (userRaw !== null) {
    user = JSON.parse(userRaw)
    const isMatch = await bcrypt.compare(password, user.password);
    pass = isMatch && user.username === username
  } else {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(INITIAL_USER.password, saltRounds)
    INITIAL_USER.password = hashedPassword
    localStorage.setItem('super-user', JSON.stringify(INITIAL_USER))
    const isMatch = await bcrypt.compare(password, hashedPassword);
    pass = isMatch && username === INITIAL_USER.username
  }

  if (pass) {
    localStorage.setItem('session', JSON.stringify(INITIAL_USER))
  }
  return pass
}