import * as fs from "fs";
import { writeFileSync } from "fs";
import { readFile } from "node:fs/promises";
import * as path from "path";

export const readFileAsync = async (filePath) => {
  return await readFile( filePath , "utf8");
}

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
  const filePaths = await getDirFiles(docsPath, ".md");
  for (const file of filePaths) {
    const fileContents = await readFileAsync(path.join(docsPath, file ));
    const customDocId = fileContents.match(/<!--\s*customDocId:\s*(\w+)\s*-->/);
  }

  const filesWithForwardSlash = filePaths.map(f => f.replace(/\\/g, "/"));

  writeFileSync(path.resolve(docsPath, "doclist.txt"), filesWithForwardSlash.join("\n"));

};
listAllDocAssetFiles().then((r) => r);
