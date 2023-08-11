const {test, expect} = require('@playwright/test');
class BooksPage {

    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card");
        this.productsText = page.locator(".book-name");   
        this.cancelBtn = page.locator("text=Cancelar");
        
        this.reserveBookBtn = page.locator("text=Reservar");
        this.confirmReservationBtn = page.locator("text=Confirmar reserva")
        this.confirmBorrowBtn = page.locator("text=Confirmar Empréstimo");
        this.confirmReturnBtn = page.locator("text=Confirmar devolução");

        this.reservedBooksList = page.locator("text=Reservados");
        this.borowedBooksList = page.locator("text=Emprestados");
        this.returnedBooksList = page.locator("text=Devolvidos");

    }

    async listUserReservedBooks()
    {
        await this.reservedBooksList.click();
    }

    async listUserBorrowedBooks()
    {
        await this.borowedBooksList.click();
    }

    async listUserReturnedBooks()
    {
        await this.returnedBooksList.click();
    }

    async reserveBook(bookName, alertmessage)
    {

        const titles = await this.productsText.allTextContents();
        console.log(bookName);
        const count = await this.products.count();
        // Zara Coat
        for(let i = 0; i < count; i++)
        {
            if(await this.products.nth(i).locator(".book-name").textContent() === bookName)
            {
            //   add to cart
            // clicks always wait
            await this.products.nth(i).locator("text=Reservar").click();
            break;
            }
        }
        await this.confirmReservationBtn.click();
        await this.page.waitForLoadState("networkidle");

        // ACCEPTANCE CRITERIA
        await expect(this.page.locator(".alert")).toBeVisible();
        await expect(this.page.locator(".alert")).toHaveText(alertmessage);


    }

    async CancelBookReservation(bookName, alertmessage)
    {

        const titles = await this.productsText.allTextContents();
        console.log(bookName);
        const count = await this.products.count();
        // Zara Coat
        for(let i = 0; i < count; i++)
        {
            if(await this.products.nth(i).locator(".book-name").textContent() === bookName)
            {
            //   add to cart
            // clicks always wait
            await this.products.nth(i).locator("text=Cancelar Reserva").click();
            break;
            }
        }
        // await this.page.waitForLoadState("networkidle");

        // ACCEPTANCE CRITERIA
        await expect(this.page.locator(".alert")).toBeVisible();
        await expect(this.page.locator(".alert")).toHaveText(alertmessage);


    }

    async borrowBook(bookName) {
        const count = await this.products.count();
    
        // Zara Coat
        for(let i = 0; i < count; i++)
        {
            if(await this.products.nth(i).locator(".book-name").textContent() === bookName)
            {
            //   add to cart
            // clicks always wait
            await this.products.nth(i).locator("text=Emprestar").click();
            break;
            }

        }
        await this.confirmBorrowBtn.click();
        await this.page.waitForLoadState("networkidle");
        // lands on user's Reserved Books page

        // ACCEPTANCE CRITERIA
        await expect(this.page.locator(".alert")).toBeVisible();
        await expect(this.page.locator(".alert")).toHaveText("status da reserva alterado!");
    }

    async returnBook(bookName) {
        // await this.goToUserBorrowedBooks();

        const count = await this.products.count();
    
        // Zara Coat
        for(let i = 0; i < count; i++)
        {
            if(await this.products.nth(i).locator(".book-name").textContent() === bookName)
            {
            //   add to cart
            // clicks always wait
            await this.products.nth(i).locator("text=Devolver").click();
            break;
            }

        }
        
        await this.confirmReturnBtn.click();
        await this.page.waitForLoadState("networkidle");
        // lands on user's Reserved Books page

        // ACCEPTANCE CRITERIA
        await expect(this.page.locator(".alert")).toBeVisible();
        await expect(this.page.locator(".alert")).toHaveText("status da reserva alterado!");
    }
    
    async findBookName(bookName)
    {
        const count = await this.products.count();
    
        // Zara Coat
        for(let i = 0; i < count; i++)
        {
            if(await this.products.nth(i).locator(".book-name").textContent() === bookName)
            {
            //   add to cart
            // clicks always wait
            await this.products.nth(i).locator("text=Emprestar").click();
            break;
            }
        }

    }


    // async cancelReservation(bookName)
    // {
    //     await this.cancelBtn.click();
    // }

}
module.exports = {BooksPage};