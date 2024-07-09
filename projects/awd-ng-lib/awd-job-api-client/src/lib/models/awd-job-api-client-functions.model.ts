
/****************************************************************************************************
 *
 * THIS FILE IS GENERATED FROM scripts/awd-job-api-client.jobs.ts
 *
 * > npm run generate-awd-job-api-client-functions
 *
 ****************************************************************************************************/

import { IAwdJobApiClientFunction } from "./awd-job-api-client.model";

export interface IAwdJobApiClientFunctions {
	/**
	* Returns list of AWD screens, filtered by the provided criteria.
	*
	* JobName: tcAJAXGetUserScreenNames
	*/
	getUserScreens: IAwdJobApiClientFunction

	/**
	* Returns all the data of the specified AWD screen.
	*
	* JobName: tcAJAXGetUserScreenDefinition
	*/
	getUserScreenDefinition: IAwdJobApiClientFunction

	/**
	* Saves updates to the specified AWD screen.
	*
	* JobName: tcAJAXSaveUserScreenDefinition
	*/
	saveUserScreenDefinition: IAwdJobApiClientFunction

	/**
	* Deletes to the specified AWD screen.
	*
	* JobName: tcAJAXDeleteUserScreenDefinition
	*/
	deleteUserScreenDefinition: IAwdJobApiClientFunction
}
