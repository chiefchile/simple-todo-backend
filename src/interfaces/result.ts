export const SUCCESS: Result = { code: 0, msg: "Success" };
export const SAVE_ERR: Result = { code: -1, msg: "Error saving" };
export const FIND_NOTE_ERR: Result = { code: -2, msg: "Error querying" };
export const UPDATE_NOTE_ERR: Result = { code: -3, msg: "Error updating" };
export const DELETE_NOTE_ERR: Result = { code: -4, msg: "Error deleting" };
export const FIND_TITLES_ERR: Result = {
  code: -5,
  msg: "Error querying titles",
};
export const NO_NOTE_UPDATED_ERR: Result = {
  code: -6,
  msg: "No record updated",
};
export const NO_NOTE_DELETED_ERR: Result = {
  code: -7,
  msg: "No record deleted",
};

export const LOGIN_ERR: Result = { code: -10, msg: "Login error" };
export const USER_NOT_FOUND_ERR: Result = { code: -11, msg: "User not found" };
export const INVALID_PASSWORD_ERR: Result = {
  code: -12,
  msg: "Invalid password",
};
export const GENERAL_ERR: Result = {
  code: -100,
  msg: "GENERAL_ERR",
};

export default interface Result {
  code: number;
  msg: string;
  token?: string;
}
