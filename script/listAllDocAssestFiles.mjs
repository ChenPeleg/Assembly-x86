import * as fs from "fs";
import { writeFileSync } from "fs";
import { readFile } from "node:fs/promises";
import * as path from "path";

class ListAllDocsFilesHelper {
  static async readFileAsync(filePath) {
    return await readFile(filePath, "utf8");
  }

  static async getDirFiles(baseDir, testFilesNamesPattern) {
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

  static async getCustomDocIdFromFile(filePath, docsPath) {
    const fileContents = await ListAllDocsFilesHelper.readFileAsync(path.join(docsPath, filePath));
    const customDocId = fileContents.match(/<!--\s*customDocId:\s*(\w+)\s*-->/);
    return customDocId ? customDocId[1] : "";
  }

  static async addCustomDocIdToFilePathName(filePath, docsPath) {
    const customDocId = ListAllDocsFilesHelper.getCustomDocIdFromFile(filePath, docsPath);
    return `${filePath} <${customDocId}>`;
  }
  static async addCustomIdsToAllFilesInList(filePaths, docsPath) {
    const filePathsWithCustomIds = [...filePaths];
    for (const file of filePathsWithCustomIds) {
      const customDocId = await  ListAllDocsFilesHelper.getCustomDocIdFromFile(file, docsPath);
      const newFilePath = `${file} <${customDocId}>`;
      const index = filePathsWithCustomIds.indexOf(file);
      filePathsWithCustomIds[index] = newFilePath;
    }
    return filePathsWithCustomIds;
  }
}


const listAllDocAssetFiles = async () => {
  const docsPath = path.resolve("src", "assets", "documentation");
  const filePaths = await ListAllDocsFilesHelper.getDirFiles(docsPath, ".md");
 const filePathsWithCustomIds =  await ListAllDocsFilesHelper.addCustomIdsToAllFilesInList(filePaths, docsPath);

  const filesWithForwardSlash = filePathsWithCustomIds.map(f => f.replace(/\\/g, "/"));

  writeFileSync(path.resolve(docsPath, "doclist.txt"), filesWithForwardSlash.join("\n"));

};
listAllDocAssetFiles().then((r) => r);
