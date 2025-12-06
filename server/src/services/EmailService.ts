// server/src/services/EmailService.ts
import Brevo from '@getbrevo/brevo';
import { ISubscriber } from '@jifywigs/shared/types/marketing';

export class EmailService {
  private apiInstance: Brevo.TransactionalEmailsApi;
  private contactsApi: Brevo.ContactsApi;

  constructor() {
    const apiKey = process.env.BREVO_API_KEY!;
    const defaultClient = Brevo.ApiClient.instance;
    defaultClient.authentications['api-key'].apiKey = apiKey;

    this.apiInstance = new Brevo.TransactionalEmailsApi();
    this.contactsApi = new Brevo.ContactsApi();
  }

  async addSubscriber(subscriber: ISubscriber) {
    try {
      await this.contactsApi.createContact({
        email: subscriber.email,
        attributes: {
          FIRSTNAME: subscriber.firstName,
          LASTNAME: subscriber.lastName,
          SOURCE: subscriber.source,
        },
        listIds: [Number(process.env.BREVO_LIST_ID!)],
        updateEnabled: true,
      });

      // Send double-opt-in email via Brevo template
      await this.apiInstance.sendTransacEmail({
        sender: { email: 'hello@jifywigs.com', name: 'JifyWigs' },
        to: [{ email: subscriber.email }],
        templateId: Number(process.env.BREVO_CONFIRM_TEMPLATE_ID!),
        params: {
          confirm_url: `${process.env.NEXT_PUBLIC_APP_URL}/confirm-subscription?token=${Buffer.from(subscriber.email).toString('base64')}`,
        },
      });
    } catch (error) {
      console.error('Brevo addSubscriber error:', error);
      throw new Error('Failed to subscribe');
    }
  }

  async sendBroadcast({ subject, htmlContent, listId }: { subject: string; htmlContent: string; listId: number }) {
    return this.apiInstance.sendTransacEmail({
      sender: { email: 'hello@jifywigs.com', name: 'JifyWigs' },
      to: [{ email: 'contact@jifywigs.com' }], // Brevo campaign uses list
      subject,
      htmlContent,
      listIds: [listId],
    });
  }
}