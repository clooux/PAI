interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

interface RegisterUser extends User {
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}
