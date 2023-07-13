const {test, expect} = require('@playwright/test');
const {customtest} = require('./utils/test-base.js')
const {POManager} = require('../pageobjects/POManager.js');
const dataset = JSON.parse(JSON.stringify(require('../testData/placeorderTestData.json')));


for(const data of dataset){
  
  test(`Client App Login ${data.productName}`, async ({page})=>
  {
    const poManager = new POManager(page);
    
    const loginPage = poManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(data.useremail, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    // Course code

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    
  })
};

customtest('Client App Login', async ({page, testDataForOrder})=>
{
  const poManager = new POManager(page);
  
  const loginPage = poManager.getLoginPage();
  await loginPage.goToPage();
  await loginPage.validLogin(testDataForOrder.useremail, testDataForOrder.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();
  // Course code

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
});