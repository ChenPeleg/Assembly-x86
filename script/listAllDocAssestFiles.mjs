import * as fs from "fs";
import * as path from "path";
import { writeFileSync } from "fs";

export const getDirFiles = async (baseDir, testFilesNamesPattern) => {
  const testFilesNamesRegex = new RegExp(`.*${testFilesNamesPattern}`, "gi");

  const recursiveGetAllTestFiles = (dir, allFiles) => {

    fs.readdirSync(dir)

      .forEach((elm, i) => {
        const fullFileName = path.join(dir, elm);
        if (fs.lstatSync(fullFileName).isDirectory()) {
          return recursiveGetAllTestFiles(fullFileName, allFiles);
        }
        if (elm.match(testFilesNamesRegex)) {
          allFiles.push(fullFileName);

        }
      });
    return allFiles;
  };
  return recursiveGetAllTestFiles(path.resolve(baseDir), []).map(f => f.replace(baseDir, ""));
};

const listAllDocAssetFiles = async () => {
  const docsPath = path.resolve("src", "assets", "documentation");
  const files = await getDirFiles(docsPath, ".md");
  const filesWithForwardSlash = files.map(f => f.replace(/\\/g, "/"));
  writeFileSync(path.resolve(docsPath, "doclist.txt"), filesWithForwardSlash.join("\n"));
  console.log("updating doc asset files");
};
listAllDocAssetFiles().then((r) => console.log("****************"));
