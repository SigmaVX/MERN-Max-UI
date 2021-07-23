const fs = require("fs");
const fsx = require("fs-extra");
// const rimraf = require("rimraf");
// const dir = "../build";
// const subDir = "../build/esap";
// const healthCheckDir = "../build/healthcheck/";
// const healthCheckPage = "./keepalive.html";

// Pending Work
try {
    console.log("Starting Post Build");
    fs.rmdirSync("../../backend/public", { recursive: true });
    console.log("Removed Old Public Directory");
    fs.mkdirSync("../../backend/public");
    console.log("Created New Public Directory");
    console.log("Copying New Build To Public Directory");
    fsx.copy("../build", "../../backend/public", (err) => {
      if (err){throw err;}
      console.log("Build Copy Complete");
      console.log("Post Build Work Complete");
    });
} catch (err) {
  console.log("Post Build Error: ", err);
}


// const fs = require("fs");
// const fsx = require("fs-extra");
// const rimraf = require("rimraf");
// const dir = "../build";
// const subDir = "../build/esap";
// const healthCheckDir = "../build/healthcheck/";
// const healthCheckPage = "./keepalive.html";

// try {
//   fs.rename("../build", "../esap", (err) => {
//     if (err) throw err;
//     console.log("Renamed Build File To ESAP");
//     !fs.existsSync(dir) && fs.mkdirSync(dir);
//     !fs.existsSync(subDir) && fs.mkdirSync(subDir);
//     console.log("Making New Build Directories");
//     fsx.copy("../esap/", "../build/esap/", (err) => {
//       if (err) throw err;
//       console.log("Moved ESAP Into Build");
//       rimraf("../esap", () => {
//         console.log("Deleted Temp ESAP Build Folder");
//         !fs.existsSync(healthCheckDir) && fs.mkdirSync(healthCheckDir);
//         console.log("Adding Health Check File To Build");
//         fs.copyFileSync(
//           healthCheckPage,
//           healthCheckDir + healthCheckPage,
//           (err) => {
//             if (err) throw err;
//           }
//         );
//       });
//       console.log("Post Build Work Complete");
//     });
//   });
// } catch (err) {
//   console.log("Post Build Error: ", err);
// }
