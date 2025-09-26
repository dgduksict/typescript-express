import { CustomError } from "../exceptions/CustomError";
import { encryptionHelper } from "../lib/encryptionHelper";
import { hideSensitiveData } from "../lib/hideDataHelper";
import { userRepository } from "../repositories/userRepository";
import { generateTokens } from "../utils/jwt";

export const userService = {
  getUserById: async (id: string) => {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new CustomError("User not found", 400);
    }
    return user;
  },
  login: async (email: string, password: string) => {
    const user = await userRepository.getByEmail(email);
    if (!user || !user.password)
      throw new CustomError(
        "Oops! We couldn't log you in. Please double-check your email and password and try again.",
        400
      );
    const isValidPassword = await encryptionHelper.compare(
      password,
      user.password
    );
    if (!isValidPassword)
      throw new CustomError(
        "Oops! We couldn't log you in. Please double-check your email and password and try again.",
        400
      );
    const { accessToken, refreshToken } = generateTokens({
      id: user.id,
      role: user.role,
    });

    const sanitizedUser = hideSensitiveData(user, ["password"]);

    return { user: sanitizedUser, accessToken, refreshToken };
  },
  create: async (
    prefix: string,
    telNumber: string,
    password: string,
    nickName: string | null,
    email: string
  ) => {
    const hasUser = await userRepository.getByEmail(email);
    if (hasUser)
      throw new CustomError("User already exists with this email.", 400);

    const hashedPassword = await encryptionHelper.encrypt(password);
    const user = await userRepository.create({
      prefix,
      telNumber,
      password: hashedPassword,
      nickName,
      email,
    });
    const { accessToken, refreshToken } = generateTokens({
      id: user.id,
      role: user.role,
    });

    const sanitizedUser = hideSensitiveData(user, ["password"]);
    return { user: sanitizedUser, accessToken, refreshToken };
  },
};
