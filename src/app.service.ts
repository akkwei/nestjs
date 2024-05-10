import { Injectable } from '@nestjs/common';

export interface Data {
  id: number,
  name: string,
  age: number,
  myheader?: string
}

@Injectable()
export class AppService {
  public getAll(): string {
    return "Hello World";
  }

  public getById(id: number): Data {
    console.log('getById', id);
    return {
      id: id,
      name: 'John',
      age: 30
    }
  }

  public getByName(name: string): Data[] {
    console.log('getByName', name);
    return [
      {
        id: 1,
        name,
        age: 30
      }
    ];
  }

  public create(data: Data, myheader: string): Data {
    console.log('create', data);
    data.myheader = myheader
    return data;
  }
}