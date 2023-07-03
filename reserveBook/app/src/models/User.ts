export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface SignUpUser extends SignInUser {
  firstName: string;
  lastName: string;
}
