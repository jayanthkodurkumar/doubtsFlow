# Notes for Ayman

# Steps to run the app
  1) npm install to install all dependencies.
  2) npx expo prebuild to build the application on emulator.
  3) npx expo run:ios

# IOS ISSUE:

a) I get an error thrown with the exception ""NSInvalidArgumentException" error."  

b) I manually type the following into the info.plist file inside "ios/doubtflow/info.plist" at Line number 40 to make it work.  

```
<dict>  
        <key>CFBundleURLSchemes</key>  
        
        <array>  
        
            <string>com.googleusercontent.apps.1039216558637-7lclgpiqtdjavcr4qqvunhrfdvcrptqt</string>  
            
        </array>  
        
</dict>
```

c) Any method to automate this issue?



<img width="1440" alt="Screenshot 2023-11-09 at 12 03 31 PM" src="https://github.com/jayanthkodurkumar/doubtsFlow/assets/83784924/45ffbeec-bd36-48b6-aa7c-e7b828e084b0">
