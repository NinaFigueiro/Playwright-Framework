const {test, expect} = require('@playwright/test');

class AllUsersPage {

    constructor(page)
    {
        this.page = page;
        this.allUsersPage = page.locator("text=Usuários");
        this.approvedUsersPage = page.locator("text=Aprovados");
        this.pendingUsersPage = page.locator("text=Pendentes");
        this.unactiveUsersPage = page.locator("text=Desativados");

        this.productsText = page.locator(".useremail");
        this.products = page.locator(".card");
        this.approveUserBtn = page.locator("#btn-approve-user");
        this.deleteUserBtn = page.locator("#btn-delete-user");
        
    }

    // THIS SHOULD ONLY BE IN MY PAGES CLASS:
    async goToAllUsersPage()
    {
        await this.allUsersPage.click(); 
        await this.page.waitForLoadState("networkidle");
    }
    
    async goToPendingUsersPage()
    {
        await this.pendingUsersPage.click(); 
        await this.page.waitForLoadState("networkidle");


    }


    async goToUnactiveUsersPage()
    {
        await this.unactiveUsersPage.click(); 
        await this.page.waitForLoadState("networkidle");
    }

    async goToUserPage(userEmail)
    {

        const titles = await this.productsText.allTextContents();
        console.log(userEmail);
        const count = await this.products.count();
        // Zara Coat
        for(let i = 0; i < count; i++)
        {
            if(await this.products.nth(i).locator(".useremail").textContent() === userEmail)
            {
            //   add to cart
            // clicks always wait
            await this.products.nth(i).locator("text=Editar Usuário").click();
            break;
            }
        }

    }

    async approveUser(userEmail, alertmessage)
    {
        await this.goToUserPage(userEmail);
        await this.approveUserBtn.click();

        await expect(this.page.locator(".alert")).toBeVisible();
        await expect(this.page.locator(".alert")).toHaveText(alertmessage)


    }

    async goToUserReservationsPage(userEmail)
    {
        const titles = await this.productsText.allTextContents();
        console.log(userEmail);
        const count = await this.products.count();
        // Zara Coat
        for(let i = 0; i < count; i++)
        {
            if(await this.products.nth(i).locator(".useremail").textContent() === userEmail)
            {
            //   add to cart
            // clicks always wait
            await this.products.nth(i).locator("text=Abrir Reservas").click();
            break;
            }
        }
    }

    async deleteUser(userEmail)
    {
        await this.goToUserPage(userEmail);
        await this.deleteUserBtn.click();
    }

    


}
module.exports = {AllUsersPage};