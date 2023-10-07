import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import * as admin from 'firebase-admin';

@Injectable()
export class ChatService {
  constructor(private firebaseService: FirebaseService) {}

  async createChatRoom(user1Id: string, user2Id: string): Promise<string> {
    const chatRef = await this.firebaseService.firestore
      .collection('chats')
      .add({
        participants: [user1Id, user2Id],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    return chatRef.id;
  }

  async sendMessage(
    chatId: string,
    userId: string,
    content: string,
  ): Promise<string> {
    const messageRef = await this.firebaseService.firestore
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        content,
        sentBy: userId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    return messageRef.id;
  }
}
