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

# REFERENCES:


**GOOGLE SIGN-IN**
1. https://www.youtube.com/watch?v=J9qDaFTP9ao
2. https://www.youtube.com/watch?v=9YzxZeMjtlY&t=74s
3. https://youtu.be/BDeKTPQzvR4?si=iZPJGR7Hcqdn7XpY
4. https://www.youtube.com/watch?v=oPTGoJw_Tik&t=2401s

**CAMERA-API**  
5. https://youtu.be/4WPjWK0MYMI?si=A38tE5EzI540FWr5

**REDUX-PERSIST**  

6. https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
7. https://youtu.be/b88Z5POQBwI?si=HH2D8getVMcJ4ckS

**ANDROID GRADLE-KOTLIN ISSUE**  
8. https://stackoverflow.com/questions/68597899/bug-exception-in-phase-semantic-analysis-in-source-unit-buildscript-unsup  
9. https://docs.gradle.org/current/userguide/compatibility.html
