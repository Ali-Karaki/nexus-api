import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class EmailService {
  public constructor(
    @InjectSendGrid() private readonly sendgridClient: SendGridService,
  ) {}

  async sendWelcomeMessage(to: string) {
    return await this.sendgridClient.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Welcome to ${process.env.APPLICATION_NAME}`,
      text: 'Your account has been successfully created',
      html: `<div>
            <strong>Welcome to ${process.env.APPLICATION_NAME}!</strong>
            <br />
            <br />
            <label>Your new account details are:</label>
            <ul>
                <li>Access email: ${to}</li>
            </ul>
            <br />
            <label>Regards</label>
          </div>`,
    });
  }

  async sendPasswordRecoveryMessage(to: string, newPassword: string) {
    return await this.sendgridClient.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Password Recovery`,
      text: 'Your password has been recovered',
      html: `<div>
          <label>Hello ${to}, we are sending you your new password <strong>${newPassword}</strong>. 
              Once you log in to the site, you can change it anytime you want.</label>
          <br />
          <br />
          <label>Regards</label>
        </div>`,
    });
  }
}
