const {test, expect} = require('@playwright/test');
const {customtest} = require('./utils/test-base.js')
const {POManager} = require('../pageobjects/POManager.js');
const dataset = JSON.parse(JSON.stringify(require('../testData/e2eTestData.json')));

const userdata = dataset[0];
const loginPendingUser = dataset[1];
const loginAdmindata = dataset[2];
const alerts = dataset[1];



  test('TP-001 User Authentication', async ({page})=>
  {
    const poManager = new POManager(page);
    
    const homePage = poManager.getHomePage();
    const createUserPage = poManager.getCreateUserPage();
    const loginPage = poManager.getLoginPage();
    const allUsersPage = poManager.getAllUsersPage();
    const booksPage = poManager.getBooksPage(); 

    const email = "user003@test.com.br";
    const book = "365 Histórias - Uma História por Dia";


    await homePage.goToPage();
    await homePage.goToCreateUserPage();
    
    await createUserPage.createUser(userdata.username, email, userdata.userpassword, userdata.userpasswordconfirm, alerts.alertCreateAccountSuccess);
    
    
    await homePage.goToLoginPage();
    // Login with pending user 
    await loginPage.Login(email, userdata.userpassword, alerts.alertLoginFail);
    
    await loginPage.Login(loginAdmindata.useremail, loginAdmindata.userpassword, alerts.alertLoginSuccess);
    
    await homePage.goToMyPage();
    
    await allUsersPage.goToAllUsersPage();
    await allUsersPage.goToPendingUsersPage();
    await allUsersPage.approveUser(email, alerts.alertApproveUserSuccess);
    await loginPage.Logout();

    await homePage.goToLoginPage();
    await loginPage.Login(email, userdata.userpassword, alerts.alertLoginSuccess)
    
    // await homePage.goToBooksPage();
    // await booksPage.reserveBook(book, alerts.alertBookReservatonSuccess);
    
    // lands on My Reservations page
    // await booksPage.CancelBookReservation(book, alerts.alertReservationCanceledSuccess);
    
    // await homePage.goToBooksPage();
    // await booksPage.reserveBook(book, alerts.alertBookReservatonSuccess);
    // await loginPage.Logout();
    
    
    await homePage.goToLoginPage();
    await loginPage.Login(loginAdmindata.useremail, loginAdmindata.userpassword, alert.alertLoginSuccess);
    
    await homePage.goToMyPage();
    await allUsersPage.goToAllUsersPage();
    await allUsersPage.goToUserReservationsPage(email);
    // await booksPage.borrowBook(book);
    await booksPage.listUserBorrowedBooks();
    await booksPage.returnBook(book);
    
    await page.pause();

    

    
    
    // await allUsersPage.deleteUser(email);
  });
