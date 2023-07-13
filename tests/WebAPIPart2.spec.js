// Login UI

const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const email = "ninafigueiro@tutanota.com";
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const signInBtn = page.locator("[value='Login']");
    const products = page.locator(".card-body");
    const productName =  'zara coat 3';

    await page.goto("https://rahulshettyacademy.com/client");
    await userEmail.fill("ninafigueiro@tutanota.com");
    await userPassword.fill("Nina-2015");
    await signInBtn.click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});


})

// Login successful
test('Client App Login', async ()=>
{
    const page = await webContext.newPage();
    
    const email = "ninafigueiro@tutanota.com";
    // const userEmail = page.locator("#userEmail");
    // const userPassword = page.locator("#userPassword");
    // const signInBtn = page.locator("[value='Login']");
    const products = page.locator(".card-body");
    const productName =  'zara coat 3';
    
    await page.goto("https://rahulshettyacademy.com/client");
    // await userEmail.fill("ninafigueiro@tutanota.com");
    // await userPassword.fill("Nina-2015");
    // await signInBtn.click();
    await page.waitForLoadState("networkidle");

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    // Zara Coat
    for(let i = 0; i < count; i++)
    {
      if(await products.nth(i).locator("b").textContent() === productName)
      {
        //   add to cart
        // clicks always wait
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible()
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    // We have to delay type('ind') in order to type in slowly
    // for auto suggestive dropdowns
      // we don't need auto wait when using "type" method
    await page.locator("[placeholder*='Country']").type("ind",{delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    let optionsCount = await dropdown.locator("button").count();
    for(let i = 0; i < optionsCount; ++i)
    {
      let text = await dropdown.locator("button").nth(i).textContent();
      // Use "trim" method for ignoring spaces in the beggining of a text
      // There is also the method "includes" which checks if the text is included
      if(text.trim() === "India")
      {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
    await expect(page.locator(".user__name label[type='text']")).toHaveText(email);
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    // Wait for the table with all my orders to be shown
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); ++i)
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId))
      {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    // await page.pause();
    
});

test('Test case 2', async ()=>
{
    const page = await webContext.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState("networkidle");

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
});