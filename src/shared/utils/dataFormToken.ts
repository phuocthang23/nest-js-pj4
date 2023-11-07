import { Injectable } from '@nestjs/common';

@Injectable()
export class DataFromToken {
  //*get data from token
  getData(request: any) {
    console.log(request);
    const user = request?.user?.id;
    return user;
  }
}
