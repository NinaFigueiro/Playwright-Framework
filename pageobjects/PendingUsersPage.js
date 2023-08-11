class PendingUsersPage {

    constructor(page)
    {
        this.page = page;
        this.allUsersPage = page.locator("text=Usuários");
        this.allReservationsPage = page.locator("text=Reservas");
        this.allBooksPage = page.locator("text=Livros");
        this.allActivitiesPage = page.locator("text=Atividades");
        
    }

    async goToEditUserPage()
    {
        await this.page.locator(".library-container").waitFor();
        await this.allUsersPage.click(); 
    }
    
    

}
module.exports = {PendingUsersPage};