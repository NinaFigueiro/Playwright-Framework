const {test, expect} = require('@playwright/test');
const {customtest} = require('./utils/test-base.js')
const {POManager} = require('../pageobjects/POManager.js');
const dataset = JSON.parse(JSON.stringify(require('../testData/createuserTestData.json')));


for(const data of dataset){
  
  test(`Client App Login ${data.username}`, async ({page})=>
  {
    const poManager = new POManager(page);
    
    // PAGES
    const homePage = poManager.getHomePage();
    const createUserPage = poManager.getCreateUserPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();


    await homePage.goToPage();
    await homePage.goToCreateUserPage();
  
    await createUserPage.createValidUser(data.username, data.useremail, data.userpassword, data.userpasswordconfirm);
    
    await page.pause();

    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    // Course code

    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    await ordersReviewPage.searchCountryAndSelect("ind","India");
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    
  })
};
