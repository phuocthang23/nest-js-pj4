import { Injectable } from '@nestjs/common';

@Injectable()
export class DataFromToken {
  //*get data from token
  getData(request: any) {
    const user = request?.user?.id;
    return user;
  }
}
