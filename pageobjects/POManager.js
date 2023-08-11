const {HomePage} = require('../pageobjects/HomePage.js');
const {CreateUserPage} = require('../pageobjects/CreateUserPage.js');
const {LoginPage} = require('../pageobjects/LoginPage.js');
const {MyPage} = require('../pageobjects/MyPage.js');
const {AllUsersPage} = require('../pageobjects/AllUsersPage.js');
const {PendingUsersPage} = require('../pageobjects/PendingUsersPage.js');
const {BooksPage} = require('../pageobjects/BooksPage.js');


class POManager
{
    constructor(page)
    {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.createUserPage = new CreateUserPage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.myPage = new MyPage(this.page);
        this.allUsersPage = new AllUsersPage(this.page);
        this.pendingUsersPage = new PendingUsersPage(this.page);
        this.booksPage = new BooksPage(this.page);
    }

    getHomePage()
    {
        return this.homePage;
    }

    getCreateUserPage()
    {
        return this.createUserPage;
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getMyPage()
    {
        return this.myPage;
    }

    getAllUsersPage()
    {
        return this.allUsersPage;
    }

    // course content
    getPendingUsersPage()
    {
        return this.pendingUsersPage;
    }

    getBooksPage()
    {
        return this.booksPage;
    }
}
module.exports = {POManager};