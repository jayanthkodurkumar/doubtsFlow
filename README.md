# Notes for Ayman

# Steps to run the app
  1) npm install to install all dependencies.
  2) npx expo prebuild to build the application on emulator.
  3) npx expo run:ios

# IOS ISSUE:

a) I get an error thrown with the exception ""NSInvalidArgumentException" error."  

b) I manually type the following into the info.plist file inside "ios/doubtflow/info.plist" at Line number 40 the following command to make it work.  

```
<dict>  
        <key>CFBundleURLSchemes</key>  
        
        <array>  
        
            <string>com.googleusercontent.apps.1039216558637-7lclgpiqtdjavcr4qqvunhrfdvcrptqt</string>  
            
        </array>  
        
</dict>
```

c) Any method to automate this issue?

