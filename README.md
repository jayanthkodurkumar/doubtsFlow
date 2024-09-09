# DOUBTSFLOW

*DoubtsFlow* is a mobile application designed to simplify and speed up the process of resolving academic doubts. The app creates a dedicated space for students to post their questions and receive answers from peers and experts within the community.

## Key Features

#### 1. Post Your Doubts: 
Students can easily post their academic questions within the app, making it simple to get help.
#### 2. Community Interaction: 
Other users can respond to these questions, promoting a collaborative learning environment.
#### 3. Premium Features:
Users with premium accounts can enhance their posts with pictures, providing clearer context for their questions.
#### 4. Admin Controls:
1. Admins can mark questions as solved or unsolved.
2. Admins can highlight the best answers by marking comments as correct.
3. Admins can award points, called luddies, to users for providing helpful answers.
#### Earn Premium Access: 
By accumulating luddies, users can unlock premium features without needing to pay.

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

**FIGMA UI**  
10. https://www.figma.com/file/qvnANkbPV0L8gfftZaFnOJ/DOUBTSFLOW-UI?type=design&node-id=0%3A1&mode=design&t=6rHl3bK151E55eoq-1
