// TP-USER-001
const {test, expect} = require('@playwright/test');
const {customtest} = require('./utils/test-base.js')
const {POManager} = require('../pageobjects/POManager.js');

// TEST DATA:
const dataset = JSON.parse(JSON.stringify(require('../testData/createuserTestData.json')));
const e2edata = JSON.parse(JSON.stringify(require('../testData/e2eTestData.json')));
const loginadmin = e2edata[0];
const alertmsgs = e2edata[1];
const loginuser = dataset[0];

// GLOBAL VARIABLES:



for(const data of dataset){
  
  test(`Create user - ${data.testName}`, async ({page})=>
  {
    const poManager = new POManager(page);
    
    const homePage = poManager.getHomePage();
    const createUserPage = poManager.getCreateUserPage();

    await homePage.goToPage();
    await homePage.goToCreateUserPage();
    await createUserPage.createUser(data.username, data.useremail, data.userpassword, data.userpasswordconfirm, data.alertmessage);
    
  })
};

test('Login with Pending User', async ({page})=>
{
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const loginPage = poManager.getLoginPage();

  await homePage.goToPage();
  await homePage.goToLoginPage();
  await loginPage.Login(loginuser.useremail, loginuser.userpassword, alertmsgs.alertLoginFail);

});

test('Login as Admin and approve user', async ({page})=>
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
