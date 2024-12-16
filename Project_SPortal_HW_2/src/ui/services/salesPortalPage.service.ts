import { GetTextMethod } from '../../data/types/base.types';
import logInPage from '../pages/logIn.page';

export abstract class SalesPortalPageService {
  private basePage = logInPage;
  async validateNotification(text: string, method: GetTextMethod = 'with') {
    const notification = await this.basePage.getNotificationText(text, method);
    expect(notification).toBe(text);
    await this.basePage.clickNotificationCloseIcon();
  }

  async signOut() {
    await this.basePage.deleteCookies(['Authorization']);
  }
}
