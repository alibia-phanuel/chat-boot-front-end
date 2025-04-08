interface User {
  id: string;
  uuid: string;
  role: string;
  name: string;
  email: string;
  profilePicture: string | null;
}

export { User };
