import { UserDAO } from './user.dao';
import { User } from './user.model';

export class UserService{

  constructor(
    private dao = new UserDAO()
  ) { }

  public createUser(
    user: User
  ): Promise<string> {
    return this.dao.insert(user);
  }

  public getUser(
    email: string
  ): Promise<User> {
    return this.dao.getUserByEmail(email);
  }

}
