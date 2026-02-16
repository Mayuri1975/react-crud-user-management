const STORAGE_KEY = "users";

export const getUsers = async () => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return { data: users };
};

export const createUser = async (user) => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const newUser = { ...user, id: Date.now().toString() };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return { data: newUser };
};

export const updateUser = async (id, updatedUser) => {
  let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  users = users.map((user) =>
    user.id === id ? { ...updatedUser, id } : user
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return { data: updatedUser };
};

export const deleteUser = async (id) => {
  let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  users = users.filter((user) => user.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return { data: id };
};
