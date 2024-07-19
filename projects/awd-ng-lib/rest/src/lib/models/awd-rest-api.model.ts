
/****************************************************************************************************
 *
 * THIS FILE IS GENERATED FROM scripts/awd-rest.api-resources.ts
 *
 * > npm run generate-awd-rest-api-model
 *
 ****************************************************************************************************/

import { IRestApiFunction } from './awd-rest.model';

export interface IAwdRestApi {

  base64Resources: {
    postStringEncode: IRestApiFunction;
		postStringDecode: IRestApiFunction;
		postUrlEncode: IRestApiFunction;
		postUrldecode: IRestApiFunction;
  }

  xmlConversionResources: {
    postConvertXmlToXsd: IRestApiFunction;
		postConvertXmlToJson: IRestApiFunction;
		postConvertJsonToXml: IRestApiFunction;
		postConvertJsonToYaml: IRestApiFunction;
		postConvertYamlToJson: IRestApiFunction;
		postConvertCvtToJson: IRestApiFunction;
		postConvertCsvToXml: IRestApiFunction;
		postConvertXmlToClass: IRestApiFunction;
		postConvertJSONToClass: IRestApiFunction;
  }

  pdfConversionResources: {
    postConvertWordToPDF: IRestApiFunction;
		postConvertJpegToPDF: IRestApiFunction;
		postConvertHtmlToPDF: IRestApiFunction;
		postConvertExcelToPDF: IRestApiFunction;
		postConvertPowerPointToPDF: IRestApiFunction;
  }

}
