// TP-USER-001
const {test, expect} = require('@playwright/test');
const {customtest} = require('./utils/test-base.js')
const {POManager} = require('../pageobjects/POManager.js');
const { BooksPage } = require('../pageobjects/BooksPage.js');

// TEST DATA:
const dataset = JSON.parse(JSON.stringify(require('../testData/createuserTestData.json')));
const e2edata = JSON.parse(JSON.stringify(require('../testData/e2eTestData.json')));
const loginadmin = e2edata[0];
const alertmsgs = e2edata[1];
const bookdata = e2edata[0];
const loginuser = dataset[0];

// GLOBAL VARIABLES:


test.only('User Creates reservation', async ({page})=>
{
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();
  const booksPage = poManager.getBooksPage();
  
  // LOGIN
  await homePage.goToPage();
  await homePage.goToLoginPage();
  await loginPage.Login(loginuser.useremail, loginuser.userpassword, alertmsgs.alertLoginSuccess);
  await homePage.goToBooksPage();
  await booksPage.reserveBook(bookdata.bookname, alertmsgs.alertBookReservatonSuccess);

  await booksPage.CancelBookReservation(bookdata.bookname, alertmsgs.alertReservationCanceledSuccess);
  await homePage.goToBooksPage();
  await booksPage.reserveBook(bookdata.bookname, alertmsgs.alertBookReservatonSuccess);
  
});

test('Admin sets reservation to "Borrowed"', async ({page})=>
{
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();
  const booksPage = poManager.getBooksPage();
  const myPage = poManager.getMyPage();

  await homePage.goToPage();
  await homePage.goToLoginPage();
  await loginPage.Login(loginadmin.adminemail, loginadmin.adminpassword, alertmsgs.alertLoginSuccess);
  await homePage.goToMyPage();
  await myPage.goToAllReservationsPage();



});

test('Admin sets reservation to "Returned"', async ({page})=>
{
  // LOGIN
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();
  const myPage = poManager.getMyPage();
  const usersPage = poManager.getAllUsersPage();

  await homePage.goToPage();
  await homePage.goToLoginPage();
  await loginPage.Login(loginadmin.adminemail, loginadmin.adminpassword, alertmsgs.alertLoginSuccess);
  
  // APPROVE USER
  await homePage.goToMyPage();
  await myPage.goToAllUsersPage();
  await usersPage.goToPendingUsersPage();
  await usersPage.approveUser(loginuser.useremail, alertmsgs.alertApproveUserSuccess);

});

test('Login with Approved User', async ({page})=>
{
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();

  await homePage.goToPage();
  await homePage.goToLoginPage();
  await loginPage.Login(loginuser.useremail, loginuser.userpassword, alertmsgs.alertLoginSuccess);

});

// test('Delete user', async ({page})=>
// {

//     const poManager = new POManager(page);
    
//     const homePage = poManager.getHomePage();

//     await homePage.goToPage();


// });
