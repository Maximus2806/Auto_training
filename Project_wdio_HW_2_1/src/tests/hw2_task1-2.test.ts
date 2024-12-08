import { dynamicControlsLocators } from '../locators/hw2_task1_locators.ts';
import { dynamicControlsPageContent } from '../data/pageContent/hw2_task1_PageContent.ts';
describe('Intaractions with dynamic elements', () => {
  const itemByLink = (text: string) => $(`//a[@href="${text}"]`);
  before(async function () {
    await browser.maximizeWindow();
  });
  beforeEach(async function () {
    await browser.url('https://the-internet.herokuapp.com/');
    await itemByLink('/dynamic_controls').click();
    await dynamicControlsLocators.removeButton().waitForDisplayed();
    const mainTitleText = (await dynamicControlsLocators.mainTitle().getText()).trim();
    const subheaderText = (await dynamicControlsLocators.subheader().getText()).trim();
    expect(dynamicControlsPageContent.title).toBe(mainTitleText);
    expect(dynamicControlsPageContent.subheader).toBe(subheaderText);
  });
  it('Sould unable checkbox', async function () {
    await dynamicControlsLocators.checkbox().click();
    await expect(dynamicControlsLocators.checkbox()).toBeChecked();
  });

  it('Sould remove checkbox by click on button', async function () {
    await dynamicControlsLocators.removeButton().click();
    await dynamicControlsLocators
      .checkbox()
      .waitUntil(async () => !(await dynamicControlsLocators.checkbox().isDisplayed()), {
        timeout: 5000,
        timeoutMsg: 'Checkbox has not disappeared in 5 sec',
      });
    const removeConfirmationText = (await dynamicControlsLocators.removedConfirmation().getText()).trim();
    expect(dynamicControlsPageContent.removeConfirmation).toBe(removeConfirmationText);
  });

  it('Sould return checkbox by click on Add button', async function () {
    await dynamicControlsLocators.removeButton().click();
    expect(dynamicControlsLocators.addButton().isDisplayed());
    await dynamicControlsLocators.addButton().click();
    await dynamicControlsLocators
      .checkbox()
      .waitUntil(async () => await dynamicControlsLocators.checkbox().isDisplayed(), {
        timeout: 5000,
        timeoutMsg: 'Checkbox has not appeared in 5 sec',
      });
    const returnConfirmationText = (await dynamicControlsLocators.returnConfirmation().getText()).trim();
    expect(dynamicControlsPageContent.returnConfirmation).toBe(returnConfirmationText);
  });

  //Task2
  it('Check waitForElementWithText function', async function () {
    await dynamicControlsLocators.removeButton().click();
    await waitForElementWithText(dynamicControlsLocators.removedConfirmation(), "It's gone!", 4000);
  });
});

type LocatorOrSelector = ChainablePromiseElement | string;

function isSelector(locatorOrSelector: LocatorOrSelector): locatorOrSelector is string {
  return typeof locatorOrSelector === 'string';
}

async function waitForElementWithText(selector: LocatorOrSelector, text: string, timeout: number = 5000) {
  const element = isSelector(selector) ? $(selector) : selector;
  await browser.waitUntil(
    async () => {
      const isDisplayed = await element.isDisplayed();
      const actualText = (await element.getText()).trim();
      const isTextMatch = text.trim() === actualText;
      return isDisplayed && isTextMatch;
    },
    {
      timeout,
      timeoutMsg: `Element is not visible after ${timeout} sec or its text is not "${text}"`,
    }
  );
}
