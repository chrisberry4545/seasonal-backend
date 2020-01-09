import fs from 'promise-fs';

export const getSqlQuery = (
  queryFileName: string
): Promise<string> =>
  fs.readFile(__dirname +  `/../sql/${queryFileName}`, 'utf8');
