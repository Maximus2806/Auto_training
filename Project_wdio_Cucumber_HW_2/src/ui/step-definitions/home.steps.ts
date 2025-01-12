import { When } from "@wdio/cucumber-framework";
import homePageService from "../services/homePage.service";

When(/^I open "Products" page$/, async function () {
  await homePageService.openProductsPage();
});
