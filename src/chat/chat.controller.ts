import { Controller, Post, Body, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('/create')
  async createChatRoom(@Body('user1Id') user1Id: string, @Body('user2Id') user2Id: string) {
    return this.chatService.createChatRoom(user1Id, user2Id);
  }

  @Post('/:chatId/send')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body('userId') userId: string,
    @Body('content') content: string
  ) {
    return this.chatService.sendMessage(chatId, userId, content);
  }
}
