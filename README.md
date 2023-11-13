# DOUBTSFLOW

# Steps to run the app
  1) Run command "npm install" to install all the dependencies
  2) Run command "npx expo prebuild" to build the app.

# IOS:

a) Install XCODE app on you macOS.  
b) Run command "npx expo run:ios" to open on ios emulator (ios 13.0+).  


# ANDROID:

a) Install android studio and open the doubtsflow/android folder using android studio to create locale.properties file.  
b) Connect your physical device to android studio or create a virtual device on android studio.  
c) Run command "npx expo run:android" to install the app on your phone/emulator.  
d) Adjust you gradle version inside "android/gradle/wrapper/gradle-wrapper-properties" file (line 3) and your kotlin version inside "android/build.gradle" file (line 9) according to your system specs. You can check the current versions by running "./gradlew --version" inside android folder.


# NOTE:

The premium version of the app will be running only on physical devices. So to use camera and post pictures, connect your phone and use the app.
