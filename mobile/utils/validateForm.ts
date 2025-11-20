export const validatePassword = (
  first: string | number,
  second: string | number
): { valid: boolean; error?: string } => {
  first = String(first);
  second = String(second);

  if (!first && !second) {
    return { valid: false, error: "пароль: поля пустые" };
  }

  if (!first) {
    return { valid: false, error: "Заполните пароль" };
  }

  if (!second) {
    return { valid: false, error: "Повторите пароль" };
  }

  if (first !== second) {
    return { valid: false, error: "Пароли не совпадают" };
  }

  return { valid: true };
};

export const validateEmail = (
  email: string
): { valid: boolean; error?: string } => {
  if (!email) {
    return { valid: false, error: "Введите email" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { valid: false, error: "Некорректный email" };
  }

  return { valid: true };
};

export const validateName = (
  username: string
): { valid: boolean; error?: string } => {
  if (!username) {
    return { valid: false, error: "Введите имя и фамилию пользователя" };
  }

  if (username.length < 3) {
    return {
      valid: false,
      error: "Имя/фамилия пользователя должно быть не короче 3 символов",
    };
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;

  if (!usernameRegex.test(username)) {
    return {
      valid: false,
      error: "Имя/фамилия пользователя может содержать только буквы, цифры и _",
    };
  }

  return { valid: true };
};
