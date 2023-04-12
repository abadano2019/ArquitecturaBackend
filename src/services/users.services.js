import {
  createUser,
  createUserPassport,
  getUserById,
  loginUser,
} from "../persistence/persistence.js";

export async function getUserByIdService(email) {
  return getUserById(email);
}

export async function createUserService(user) {
  return createUser(user);
}

export async function createUserPassportService(user) {
  return createUserPassport(user);
}

export async function loginUserService(user) {
  return loginUser(user);
}
