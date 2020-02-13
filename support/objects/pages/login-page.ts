import { browser, element, by, ElementFinder } from 'protractor';


export class LoginPage {
  private data = {
    username: by.id('login-username'),
    password: by.id('login-password'),
    submit: by.id('login-submit')
  };

  get userNameField(): ElementFinder {
    return element(this.data.username);
  }

  get passwordField(): ElementFinder {
    return element(this.data.password);
  }

  get submitBtn(): ElementFinder {
    return element(this.data.submit);
  }

  async signIn(login: string, password: string): Promise<void> {
    const el = await this.userNameField.waitReady(20000);
    await el.sendKeys(login);
    await this.passwordField.sendKeys(password);
    await this.submitBtn.click();
  }
}
