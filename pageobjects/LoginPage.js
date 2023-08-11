const {test, expect} = require('@playwright/test');

class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.userEmail = page.locator("#email");
        this.userPassword = page.locator("#password");
        this.signInBtn = page.locator(".btn");
        this.signOutBtn = page.locator("text=Sair");
    }

    // async goToPage()
    // {
    //     await this.page.goto('https://rahulshettyacademy.com/client');
    // }

    async Login(useremail, password, alertmessage)
    {
        await this.userEmail.fill(useremail);
        await this.userPassword.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState("networkidle");

        await expect(this.page.locator(".alert")).toBeVisible();
        await expect(this.page.locator(".alert")).toHaveText(alertmessage);
    }

    async Logout()
    {
        await this.signOutBtn.click();
    }
}
module.exports = {LoginPage};