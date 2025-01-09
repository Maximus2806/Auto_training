export type ActionContext = {
  isSecretValue?: boolean;
};

type SelectorOrLocator = string | WebdriverIO.Element;

function isStringSelector(selector: SelectorOrLocator): selector is string {
  return typeof selector === "string";
}

export abstract class BasePage {
  async findElement(selector: SelectorOrLocator): Promise<WebdriverIO.Element> {
    return isStringSelector(selector) ? await $(selector).getElement() : selector;
  }

  async findArrayOfElements(selector: SelectorOrLocator) {
    return await $$(selector).getElements();
  }

  async waitForDisplayed(selector: SelectorOrLocator, reverse = false, timeout = 30000) {
    const element = await this.findElement(selector);
    await element.waitForDisplayed({
      reverse,
      timeout,
    });
    return element;
  }

  async click(selector: SelectorOrLocator) {
    const element = await this.waitForDisplayed(selector);
    await element.waitForEnabled();
    await element.click();
  }

  async setValue(selector: SelectorOrLocator, value: string | number, context?: ActionContext) {
    const input = await this.waitForDisplayed(selector);
    await input.setValue(value);
  }

  async selectDropdownValue(selector: SelectorOrLocator, value: string | number) {
    const select = await this.waitForDisplayed(selector);
    await select.selectByVisibleText(value);
  }

  async getText(selector: SelectorOrLocator) {
    const element = await this.waitForDisplayed(selector);
    const text = await element.getText();
    return text;
  }

  async getValue(selector: SelectorOrLocator) {
    const element = await this.waitForDisplayed(selector);
    const value = await element.getValue();
    return value;
  }

  async openPage(url: string) {
    await browser.url(url);
  }

  async deleteCookies(cookieNames: string[]) {
    await browser.deleteCookies(cookieNames);
  }

  async getCookie(cookieName: string) {
    return (await browser.getCookies(cookieName))[0];
  }

  async isElementDisplayed(selector: SelectorOrLocator) {
    const element = await this.findElement(selector);
    return await element.isDisplayed();
  }
}
