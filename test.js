import { remote } from 'webdriverio';
import { expect, assert } from 'chai';
import { exec } from 'child_process';
import util from 'util';

const execPromisified = util.promisify(exec);

describe('My mobile app', function() {
  this.timeout(99999); 
  let driver;

  beforeEach(async function() {
    try {
      driver = await remote({
        hostname: '192.168.100.5',
        port: 4723,
        logLevel: 'info',
        capabilities: {
          platformName: 'Android',
          'appium:automationName': 'UiAutomator2',
          'appium:deviceName': 'Android',
          'appium:appPackage': 'com.saucelabs.mydemoapp.android',
          'appium:appActivity': 'com.saucelabs.mydemoapp.android.view.activities.SplashActivity',
        },
      });
    } catch (error) {
      console.error('Error initializing remote:', error);
    }
  });

  afterEach(async function() {
    if (driver) {
      await driver.deleteSession();
    }
  });

  describe ('UI Tests', function(){
    it('Clicking on the nav button should open nav drawer', async function() {
      const navButton = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/menuIV")')
      await navButton.click()
      await driver.pause(1000)
      const navDrawer = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/menuRV")')
      expect(navDrawer).to.exist
    })


    //For the following 2 tests, we are simulating the buttons leading to a new page by identifying a new item
    //specific to the page we are navigating towards. That way we know the navigation was successful

    //1.
    it('Clicking on an item from the shoplist should navigate towards the items\'\s page', async function() {
      const item = await driver.$('android=new UiSelector().className("android.view.ViewGroup").instance(4)')
      await item.click()
      await driver.pause(2000)
      const itemPage = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartBt")')
      expect(itemPage).to.exist
    })

    //2.
    it('Clicking on cart should lead towards the page with all the items in the cart', async function() {
      const cartButton = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartRL")')
      await cartButton.click()
      await driver.pause(2000)
      
      const cartPageButtonForShopping = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/shoppingBt")')
      expect(cartPageButtonForShopping).to.exist
    })
  })

  describe ('Functional Tests', async function() {
    
    //Complete purchase flow  
    it('Complete purchase flow', async function() {

      const item = await driver.$('android=new UiSelector().className("android.view.ViewGroup").instance(4)')
      await item.click()
      await driver.pause(1000)
      const itemPage = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartBt")')
      await itemPage.click()
      await driver.pause(1000)
      const checkoutButton = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartIV")')
      await checkoutButton.click()

      await driver.pause(1000)

      const proceed = await driver.$('//android.widget.Button[@content-desc="Confirms products for checkout"]')
      await proceed.click()
      await driver.pause(1000)

      const fillInLoginCredentials = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/username1TV")')
      await fillInLoginCredentials.click()
      await driver.pause(1000)

      const loginButton = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/loginBtn")')
      await loginButton.click()
      await driver.pause(1000)


      const fullNameBox = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/fullNameET")')
      await fullNameBox.setValue('Ion Doe')

      const addressBox = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/address1ET")')
      await addressBox.setValue('Strada Liviu Rebreanu, Nr. 55')

      const cityBox = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cityET")')
      await cityBox.setValue('Bucuresti')

      const zipCodeBox = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/zipET")')
      await zipCodeBox.setValue('12345')

      const countryBox = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/countryET")')
      await countryBox.setValue('Romania')
      
      const toPayment = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/paymentBtn")')
      await toPayment.click();

      await driver.pause(1000);

      const cardInfoName = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/nameET")')
      await cardInfoName.setValue('Ion Doe')

      const cardNumber = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cardNumberET")')
      await cardNumber.setValue('4111111111111111')

      const cardExpiration = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/expirationDateET")')
      await cardExpiration.setValue('03/25')

      const cardCVV = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/securityCodeET")')
      await cardCVV.setValue('123')

      const reviewOrder = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/paymentBtn")')
      await reviewOrder.click()

      await driver.pause(1000)

      const sendOrder = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/paymentBtn")')
      await sendOrder.click()

      await driver.pause(1000)
      const orderConfirmation = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/orderTV")')
      const orderConfirmationText = await orderConfirmation.getText()

      expect(orderConfirmation).to.exist
      expect(orderConfirmationText).to.equal('Your order has been dispatched and will arrive as fast as the pony gallops!')
    })

    it('Sorting should work', async function() {
      //Selects the 
      const element = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/sortIV")')
      await element.click()
      await driver.pause(1000)
      const sortOptions = await driver.$('android=new UiSelector().text("Price - Descending")')
      await sortOptions.click()
      await driver.pause(2000)
      const firstElement = await driver.$('android=new UiSelector().className("android.view.ViewGroup").instance(4)')
      const firstElemTextElem = await firstElement.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/priceTV")')
      const firstElemPrice = await firstElemTextElem.getText()

      const secondElement = await driver.$('android=new UiSelector().className("android.view.ViewGroup").instance(6)')
      const secondElemTextElem = await secondElement.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/priceTV")')
      const secondElemPrice = await secondElemTextElem.getText()
      const firstElemePriceParsed = parseFloat(firstElemPrice.slice(2))
      const secondElemPriceParsed = parseFloat(secondElemPrice.slice(2))
      expect(firstElemePriceParsed).to.be.greaterThan(secondElemPriceParsed)
    })

  })

  describe('Performance Testing', function() {
    it('Adding 10 items and removing them from cart should take less than 15 seconds', async function() {
      const start = Date.now()

        const elem = await driver.$('android=new UiSelector().className("android.view.ViewGroup").instance(4)')
        await elem.click()
        const plusItem = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/plusIV")')
        for (let i = 0; i < 9; i++) {
          await plusItem.click()
        }
        const addToCart = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartBt")')
        await addToCart.click()
        const cartButton = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartIV")')
        await cartButton.click()
        const removeButton = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/removeBt")')
        await removeButton.click()

      const end = Date.now()
      const operationTime = end - start;
      assert.isBelow(operationTime, 15000, 'UI operation time is below 15 seconds');
    });

    //From what we've tested this seems to fail, usually takes like ~5 seconds
    it.only('Clicking on login should take you to the login page in less than 3 seconds', async function(){
      const start = Date.now()

        const navButton = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/menuIV")')
        await navButton.click()
        const loginRedirector = await driver.$('android=new UiSelector().text("Log In")')
        await loginRedirector.click()
        const loginPage = await driver.$('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/loginBtn")')
        await loginPage.waitForExist({ timeout: 3000 })
      const end = Date.now()
      const operationTime = end - start;
      assert.isBelow(operationTime, 3000, 'UI operation time is below 3 seconds');
    })
  });
});




