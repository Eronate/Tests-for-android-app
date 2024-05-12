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

Video of running the tests:

https://www.youtube.com/watch?v=c7nuX5uN61o

Tools used/Comparision with AI generated tests: 

ChatGPT/Copilot would have a hard time generating tests, as elements need to be inspected with Appium Inspector in order to build tests around them, and it has no way of knowing the right Selectors one would need to use in order to proceed. The app is tested in a black-box sense, using the APK only.
