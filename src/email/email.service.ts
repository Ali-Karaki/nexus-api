import { Injectable } from '@nestjs/common';
import * as postmark from 'postmark';

@Injectable()
export class EmailService {
  private postmarkClient: postmark.ServerClient;

  constructor() {
    this.postmarkClient = new postmark.ServerClient(
      process.env.POSTMARK_API_KEY,
    );
  }

  async sendWelcomeMessage(To: string) {
    try {
      await this.postmarkClient.sendEmail({
        To,
        From: process.env.POSTMARK_FROM_EMAIL,
        Subject: `Welcome to ${process.env.APPLICATION_NAME}`,
        TextBody: 'Your account has been successfully created',
        HtmlBody: `<div>
              <strong>Welcome to ${process.env.APPLICATION_NAME}!</strong>
              <br />
              <br />
              <label>Your new account details are:</label>
              <ul>
                  <li>Access email: ${To}</li>
              </ul>
              <br />
              <label>Regards</label>
            </div>`,
      });

      return {
        success: true,
        message: 'Welcome sent',
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  async sendPasswordRecoveryMessage(To: string, newPassword: string) {
    return await this.postmarkClient.sendEmail({
      To,
      From: process.env.POSTMARK_FROM_EMAIL,
      Subject: `Password Recovery`,
      TextBody: 'Your password has been recovered',
      HtmlBody: `<div>
          <label>Hello ${To}, we are sending you your new password <strong>${newPassword}</strong>. 
              Once you log in to the site, you can change it anytime you want.</label>
          <br />
          <br />
          <label>Regards</label>
        </div>`,
    });
  }
}
