class MyPage {

    constructor(page)
    {
        this.page = page;
        this.allUsersPage = page.locator("text=Usuários");
        this.allReservationsPage = page.locator("text=Reservas");
        this.allBooksPage = page.locator("text=Livros");
        this.allActivitiesPage = page.locator("text=Atividades");
        
    }

    async goToAllUsersPage()
    {
        await this.allUsersPage.click(); 
    }
    
    async goToAllReservationsPage()
    {
        await this.allReservationsPage.click(); 
    }

    async goToAllBooksPage()
    {
        await this.allBooksPage.click(); 
    }

    async goToAllActivitiesPage()
    {
        await this.allActivitiesPage.click(); 
    }

}
module.exports = {MyPage};