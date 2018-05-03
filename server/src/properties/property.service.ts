import { PropertyDAO } from './property.dao';
import { Property } from './property.model';

export class PropertyService {

  constructor(
    private dao = new PropertyDAO()
  ) { }

  public listProperties(
    query: any = {},
    offset: number = 0,
    limit: number = 10
  ): Promise<Property[]> {
    return this.dao.query(query, offset, limit);
  }

  public getProperty(
    id: string = ""
  ): Promise<Property> {
    return this.dao.getProperty(id);
  }

  public createProperty(
    property: Property
  ): Promise<string> {
    return this.dao.insert(property);
  }

}
