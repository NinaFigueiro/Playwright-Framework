const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require("./utils/APIUtils.js");
const loginPayLoad = {userEmail:"marianapereirinha2@gmail.com", userPassword:"Test-1234"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
const fakePayloadOrders = {data:[], message:"No Orders"};

let response;
test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
});

// test.beforeEach( ()=>
// {

// });

// The goal is to try to see an order wich is not allowed to the logged in user
// and see error message in page: Not Authorized
test('Place the order', async ({page})=>
{
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/client/dashboard/get-order-details?/id=64a5f11f7244490f95767da",
    route => route.continue({url: "https://rahulshettyacademy.com/client/dashboard/get-order-details?/id=64a5f11f7244490f95767da"})
);
    
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
   
    
});