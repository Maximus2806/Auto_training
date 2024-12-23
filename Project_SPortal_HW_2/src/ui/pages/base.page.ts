
type SelectorOrLocator = string | WebdriverIO.Element;

function isStringSelector(selector: SelectorOrLocator): selector is string {
  return typeof selector === 'string'
};

export abstract class BasePage {

  async findElement(selector: SelectorOrLocator): Promise<WebdriverIO.Element> {
    return isStringSelector(selector) ? $(selector).getElement() : selector    
  }

  async findArrayOfElements(selector: SelectorOrLocator) {
    return $$(selector).getElements();
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

  async setValue(selector: SelectorOrLocator, value: string | number) {
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

  async getAttribute(selector: SelectorOrLocator, name: string) {
    const element = await this.waitForDisplayed(selector);
    const atribute = await element.getAttribute(name);
    return atribute;
  }

  async openPage(url: string) {
    await browser.url(url);
  }

  async deleteCookies(cookieNames: string[]) {
    await browser.deleteCookies(cookieNames);
  }
}
