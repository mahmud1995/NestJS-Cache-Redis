import { Logger } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
  private logger: Logger = new Logger('SocketEventsGateway');
  private summeryClient = 0;
  public afterInit(server: any) {
    this.logger.log(
      ` WebSocket Server initialized total: ${this.summeryClient}`,
    );
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.summeryClient++;
    this.logger.log(`== Client connected total: ${this.summeryClient}`);
  }

  handleDisconnect(client: WebSocket) {
    this.summeryClient--;
    this.logger.log(`== Client connected total: ${this.summeryClient}`);
  }
}
