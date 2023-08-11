const {test, expect} = require('@playwright/test');

class CreateUserPage {

    constructor(page)
    {
        this.page = page;
        this.userName = page.locator("#name");
        this.userEmail = page.locator("#email");
        this.userPassword = page.locator("#password");
        this.userPasswordConfirm = page.locator("#password-confirm");
        this.createUserBtn = page.locator("#form-criar-conta").locator("text=Criar Conta");

        
    }


    async createUser(username, useremail, userpassword, userpasswordconfirm, alertmessage)
    {
        await this.userName.fill(username);
        await this.userEmail.fill(useremail);
        await this.userPassword.fill(userpassword);
        await this.userPasswordConfirm.fill(userpasswordconfirm);
        await this.createUserBtn.click();
        await this.page.waitForLoadState("networkidle");

        await expect(this.page.locator(".alert")).toBeVisible();
        await expect(this.page.locator(".alert")).toHaveText(alertmessage)
        // const displayMessage =  await this.page.locator(".alert").textContent();

        // await this.alertmessage.waitFor();
        // console.log(alertmessage)
    }
}
module.exports = {CreateUserPage};