const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require("./utils/APIUtils.js");
const loginPayLoad = {userEmail:"ninafigueiro@tutanota.com", userPassword:"Nina-2015"};
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

// The goal is to insert fake response in order to get an empty
// list and in the page, the Messafge: No orders
test('Place the order', async ({page})=>
{
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64a5f11f7244490f95767d5a",
    async route=>
    {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders);
        route.fulfill(
            {
                response,
                body,
            }
        )
        console.log(response);
        console.log(body);
        // intercepting respone - API response->{playwright fakeresponse}->browser->render
    });

    // await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer",
    // async (route)=>
    // {
    //     const response = await page.request.fetch(route.request());
    //     let body = JSON.stringify(fakePayloadOrders);
    //     route.fulfill(
    //         {
    //             response,
    //             body,
    //         }
    //     )
    //     // intercepting respone - API response->{playwright fakeresponse}->browser->render
    // });

    await page.locator("button[routerlink*='myorders']").click();
    // await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer")
    // await page.waitForLoadState("networkidle");
    // await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer");
    
    console.log(await page.locator(".mt-4").textContent());

    // const emptyOrdersMsg = await page.locator(".mt-4").textContent()
    // console.log('*****MESSAGE*****')
    // console.log(emptyOrdersMsg);
    page.pause();
    
});