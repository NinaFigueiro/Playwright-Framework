const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils.js');
const loginPayLoad = {userEmail:"ninafigueiro@tutanota.com", userPassword:"Nina-2015"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};

let response;
test.beforeAll( async()=>
{
    // Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);

});

// test.beforeEach( ()=>
// {

// });

// CREATE ORDER api
test('Place the order', async ({page})=>
{
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    // Wait for the table with all my orders to be shown
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); ++i)
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId))
      {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

    // await page.pause();
    
});