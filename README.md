Uses:

- Virtual (Android Device to run the apk on)
- Appium + UiAutomator2 (for simulating UI commands over the Android Device)
- WebdriverIO (for querying elements with Selectors)
- Mocha (as a testing framework)
- Chai (for assertions)

How to setup:
- Download Android Studio
- Through Android Studio download the Android SDKs vers. 34
- Setup a virtual Android Device using Android Studio (will to add some PATH variables for the setup)
- Git clone the project and do  ```npm install```
- Open the Android Phone and drag & drop the Apk file on it to install
- Run the tests with ```mocha test.js```

Includes: UI tests, Functional tests, Performance tests for the sample app in /apk
