import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): string {
    return 'JoinIn API is running!';
  }
}
