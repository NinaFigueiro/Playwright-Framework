const {test, expect} = require('@playwright/test');

test('Open Home Page Clear Browser 001', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    // This will block any css calls, or imgs making test faster
    // but it can impact the test
    // page.route('**/*.{jpg,png,jpeg}', route=> route.abort());
    const userName = page.locator("#username");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    // List all request and response calls
    // not working, class 45
    page.on('request', request=> console.log(request.url()));
    page.on('response', response=> console.log(response.url(), response.status()));


    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')

// Check error on top page
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    // race condition
    await Promise.all([
        page.waitForNavigation(),
        signInBtn.click()

    ]);
    await signInBtn.click();
    // Waits until this locator is present
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
// Finds first element from multiple elements
    // console.log(await cardTitles.first().textContent());
// Finds second element from multiple elements
    // console.log(await cardTitles.nth(1).textContent());
// Get all cards titles WITHOUT API
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    

});

test.only('UI Controls', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signInBtn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    // assertion
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    // getting a boolean value for a scenario
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator('#terms').click();
    await page.locator('#terms').uncheck();
    // since there is no way to assert that the element is uncheched, we expect isChecked to be false
    // await should be inside expect if action is also inside (class 18)
    expect(await page.locator('#terms').isChecked).toBeFalsy;

    await expect(documentLink).toHaveAttribute("class", "blinkingText"); 
    // await page.pause();

});


// not working, does not return to previous page (class 19)
test('Child windows hadl', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#userName").type(domain);
    await page.pause();
    console.log(await page.locator("#userName").textContent());
    
});




test('Login successful', async ({page})=>
{
    
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const signInBtn = page.locator("[value='Login']");

    await page.goto('https://rahulshettyacademy.com/client');
    await userEmail.fill("ninafigueiro@tutanota.com");
    await userPassword.fill("Nina-2015");
    await signInBtn.click();
    await page.waitForLoadState("networkidle");

    const titles = await page.locator(".card-body b").allTextContents();

    console.log(titles);

});


test('Open Home Page Info Browser', async ({page})=>
{
    // Open Home Page
    await page.goto('https://www.brasileirinhos-dk.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle("Brasileirinhos | Página inicial")
});
