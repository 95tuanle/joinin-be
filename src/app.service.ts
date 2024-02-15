import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex() {
    return { message: 'JoinIn API is running!' };
  }
}
