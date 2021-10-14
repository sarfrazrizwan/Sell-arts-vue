import User from "./../User";
export default interface Auth {
  isLoggedIn: boolean;
  user?: User | undefined;
}
