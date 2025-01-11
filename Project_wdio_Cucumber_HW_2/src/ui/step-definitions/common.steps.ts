import { Given, Then, When } from "@wdio/cucumber-framework";
import signInPage from "../pages/signIn.page";
import pages from "../pages/page-factory";

Given(/^I open Sales Portal$/, async function () {
  await signInPage.open();
});

When(
  /^I enter "([^"]*)" to "([^"]*)" on "([^"]*)" page$/,
  async function (value: string, element: string, page: string) {
    await pages[page].setValue(pages[page][element], value);
  }
);

When(/^I click on "([^"]*)" on "([^"]*)" page$/, async function (element: string, page: string) {
  await pages[page].click(pages[page][element]);
});

When(/^I click on Menu "([^"]*)" on "([^"]*)" page$/, async function (element: string, page: string) {
  await pages[page].click(pages[page]["Menu Button"](element));
});

When(/^I select "([^"]*)" in "([^"]*)" on "([^"]*)" page$/, async function (item: string, element: string, page: string) {  
  await pages[page].selectDropdownValue(pages[page][element], item)
});

Then(
  /^I should( not)? see "([^"]*)" (with|contains) text "([^"]*)" on "([^"]*)" page$/,
  async function (not: string, element: string, compareMethod: string, text: string, page: string) {
    const actualText = await pages[page].getText(pages[page][element]);
    if (not) {
      compareMethod === "contains" ? expect(actualText).not.toContain(text) : expect(actualText).not.toBe(text);
    } else {
      compareMethod === "contains" ? expect(actualText).toContain(text) : expect(actualText).toBe(text);
    }
  }
);

Then(/^I should( not)? see "([^"]*)"$/, async function (not: string, selector: string) {
  await $(selector).waitForDisplayed({ reverse: !!not });
});

//I should see notification contains text "Product was successfully created"
Then(
  /^I should see notification (with|contains) text "([^"]*)" on "([^"]*)" page$/,
  async function (method: string, message: string, page: string) {
    const notification = await pages[page].getNotificationByText(message, method);
    const actualMessage = await pages[page].getText(notification);
    expect(actualMessage).toBe(message);
  }
);

Then(/^I wait that "([^"]*)" page is loaded$/,
  async function (page: string) {
    await pages[page].waitForPageOpened()
  }
);
