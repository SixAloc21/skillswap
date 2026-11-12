import {
  Injectable
} from '@angular/core';

import {
  Client,
  IMessage,
  StompSubscription
} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class SupportWebSocketService {

  private client: Client;

  constructor() {

    this.client = new Client({
      brokerURL:
        'wss://skillswap-api-e7y8.onrender.com/ws',

      reconnectDelay: 5000,

      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      debug: (mensaje) => {
        console.log(
          '[WebSocket]',
          mensaje
        );
      }
    });
  }

  conectar(
    onConnect: () => void
  ): void {

    this.client.onConnect = () => {
      console.log(
        'WebSocket conectado'
      );

      onConnect();
    };

    this.client.onStompError =
      (frame) => {

        console.error(
          'Error STOMP:',
          frame
        );
      };

    if (!this.client.active) {
      this.client.activate();
    }
  }

  escucharConversacion(
    conversationId: number,
    callback: (
      mensaje: any
    ) => void
  ): StompSubscription {

    return this.client.subscribe(
      `/topic/support/${conversationId}`,
      (message: IMessage) => {

        callback(
          JSON.parse(
            message.body
          )
        );
      }
    );
  }

  escucharConversaciones(
    callback: (
      conversacion: any
    ) => void
  ): StompSubscription {

    return this.client.subscribe(
      '/topic/support/conversations',
      (message: IMessage) => {

        callback(
          JSON.parse(
            message.body
          )
        );
      }
    );
  }

  desconectar(): void {

    if (this.client.active) {
      this.client.deactivate();
    }
  }
}