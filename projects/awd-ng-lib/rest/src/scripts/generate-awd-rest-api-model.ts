import { writeFileSync } from 'fs';
import { AWD_REST_RESOURCES } from '../lib/awd-rest-api.resources';

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const resourceInterfaces = [];
Object.keys(AWD_REST_RESOURCES).forEach((resourceArea) => {
  resourceInterfaces.push(
    `
  ${resourceArea}: {
    ${Object.keys(AWD_REST_RESOURCES[resourceArea])
      .map((resourceItem) => {
        return AWD_REST_RESOURCES[resourceArea][resourceItem].methods
          .map((method) => {
            return `${method.toLowerCase()}${capitalize(
              resourceItem
            )}: IRestApiFunction;`;
          })
          .join('\n\t\t');
      })
      .join('\n\t\t')}
  }
`
  );
});

const FILE_CONTENTS = `
/****************************************************************************************************
 *
 * THIS FILE IS GENERATED FROM scripts/awd-rest.api-resources.ts
 *
 * > npm run generate-awd-rest-api-model
 *
 ****************************************************************************************************/

import { IRestApiFunction } from './awd-rest.model';

export interface IAwdRestApi {
${resourceInterfaces.join('')}
}
`;

writeFileSync(
  __dirname + '/../lib/models/awd-rest-api.model.ts',
  FILE_CONTENTS
);
