class HomePage {

    constructor(page)
    {
        this.page = page;
        this.createUserPage = page.locator("text=Criar Conta");
        this.loginPage = page.locator("text=Login");
        this.myPage = page.locator(".mypage");
        this.booksPage = page.locator("text=Biblioteca");
       
    }

    async goToPage()
    {
        // await this.page.goto('https://www.brasileirinhos-dk.com/');
        await this.page.goto('http://localhost:8000/');
    }

    async goToCreateUserPage ()
    {
        await this.createUserPage.click(); 
    }
    
    async goToLoginPage ()
    {
        await this.loginPage.click(); 
    }

    async goToMyPage ()
    {
        await this.myPage.click(); 
    }

    async goToBooksPage ()
    {
        await this.booksPage.click(); 
    }

}
module.exports = {HomePage};