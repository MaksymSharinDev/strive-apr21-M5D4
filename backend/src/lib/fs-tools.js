
import fs from "fs-extra"
const { readJSON, writeJSON, writeFile } = fs
import { fileURLToPath } from "url"
import { dirname, join } from "path"
const authorsPublicFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../../public/img/authors")
export const getCurrentFolderPath = currentFile => dirname(fileURLToPath(currentFile))
export const writeAuthorsPicture = (fileName, content) => writeFile(join(authorsPublicFolderPath, fileName), content)