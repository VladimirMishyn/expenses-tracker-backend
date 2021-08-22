export interface UserInterface {
  name: string;
  email: string;
  password: string;
  tokens: Array<{ token: string }>;
}
