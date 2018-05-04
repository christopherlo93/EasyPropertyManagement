import { Collection, Database, Datastore } from '../datastore/datastore';
import { User } from './user.model';

export class UserDAO {

  constructor(
    private db: Database = Datastore.getDB()
  ) { }

  public async insert(user: User): Promise<string> {
    const result = await this.userCollection().insert(user);
    return result._id;
  }

  public async query(query: any, offset: number, limit: number): Promise<User[]> {
    const users = await this.userCollection().find(query)
    return users.slice(offset, offset + limit);
  }

  public getUser(id: string): Promise<User> {
    return this.userCollection().findById(id);
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.userCollection().findByEmail(email);
  }

  private userCollection(): Collection<User> {
    return this.db.collection('users');
  }

}
