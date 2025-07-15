export const MAX_LENGTH = 80;

export function validateInput(text, showError) {
  if (text.length === 0) {
    showError("متن تسک نمی‌تواند خالی باشد.");
    return false;
  }
  if (text.length > MAX_LENGTH) {
    showError("متن نباید بیش از ۸۰ کاراکتر باشد.");
    return false;
  }
  return true;
}
