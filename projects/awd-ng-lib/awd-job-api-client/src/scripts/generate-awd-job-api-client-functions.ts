import { writeFileSync } from 'fs';
import { JOBS } from '../lib/awd-job-api-client.jobs';

const jobFunctions = [];
Object.keys(JOBS).forEach((jobName) => {
  const jobDef = JOBS[jobName];

  jobFunctions.push({
    functionName: jobDef.alias,
    jobName: jobName,
    desc: jobDef.description
  });
});

const FILE_CONTENTS = `
/****************************************************************************************************
 *
 * THIS FILE IS GENERATED FROM scripts/awd-job-api-client.jobs.ts
 *
 * > npm run generate-awd-job-api-client-functions
 *
 ****************************************************************************************************/

import { IAwdJobApiClientFunction } from "./awd-job-api-client.model";

export interface IAwdJobApiClientFunctions {
${jobFunctions.map((jobFunction, index) => {
  const text = [
    '/**',
    `* ${jobFunction.desc}`,
    '*',
    `* JobName: ${jobFunction.jobName}`,
    '*/',
    `${jobFunction.functionName}: IAwdJobApiClientFunction`
  ]
  // if (index > 0) {
  //   text[0] = '\+ text[0];
  // }
  return '\t' + text.join('\n\t');
}).join('\n\n')}
}
`;

writeFileSync(
  __dirname + '/../lib/models/awd-job-api-client-functions.model.ts',
  FILE_CONTENTS
);