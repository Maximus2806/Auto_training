import { When } from "@wdio/cucumber-framework";
import signInPageService from "../services/signInPage.service";

When(/^I login as Admin$/, async function () {
  await signInPageService.loginAsAdmin();
});
