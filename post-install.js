const path = require("path");
const {readFile, writeFile, promises: fsPromises} = require('fs');
let filePath = path.resolve(__dirname,"ios/Pods/Pods.xcodeproj/project.pbxproj");
console.log(filePath);
 readFile(filePath, 'utf-8',function (err, contents) {
    if (err) {
      console.log(err);
      return;
    }
    const replaced = contents.replace(/IPHONEOS_DEPLOYMENT_TARGET = 11.0/g, 'IPHONEOS_DEPLOYMENT_TARGET = 12.4');
  
    writeFile(filePath, replaced, 'utf-8', function (err) {
      if (err) {
        console.log(err);
      }else{
        console.log("project.pbxproj deployment target updated");
      }
    });
  })