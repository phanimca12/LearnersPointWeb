/****************************************************************************************************
 *
 * This file is used to generate the awd-job-api-client-function.model.ts file.
 *
 * After any updates here, you must run the following script.
 *
 * > npm run generate-awd-job-api-client-functions
 *
 ****************************************************************************************************/

export const JOBS = {
  'tcAJAXGetUserScreenNames': {
    alias: 'getUserScreens',
    description: 'Returns list of AWD screens, filtered by the provided criteria.'
  },
  'tcAJAXGetUserScreenDefinition': {
    alias: 'getUserScreenDefinition',
    description: 'Returns all the data of the specified AWD screen.'
  },
  'tcAJAXSaveUserScreenDefinition': {
    alias: 'saveUserScreenDefinition',
    description: 'Saves updates to the specified AWD screen.'
  },
  'tcAJAXDeleteUserScreenDefinition': {
    alias: 'deleteUserScreenDefinition',
    description: 'Deletes to the specified AWD screen.'
  }
}