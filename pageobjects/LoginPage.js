class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.signInBtn = page.locator("[value='Login']");
    }

    async goToPage()
    {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(useremail, password)
    {
        await this.userEmail.fill(useremail);
        await this.userPassword.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState("networkidle");
    }
}
module.exports = {LoginPage};