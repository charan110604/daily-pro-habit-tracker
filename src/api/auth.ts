export const loginUser = async (email: string, password: string) => {

  const res = await fetch(
    `http://localhost:3001/users?email=${email}&password=${password}`
  );

  const data = await res.json();

  return data.length > 0 ? data[0] : null;
};