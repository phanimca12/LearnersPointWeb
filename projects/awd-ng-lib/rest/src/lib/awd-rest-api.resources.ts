/****************************************************************************************************
 *
 * This file is used to generate awd-rest-api.model.ts
 *
 * After making any code changes to this file, make sure to re-run the generate script:
 *    > npm run generate-awd-rest-api-model
 *
 ****************************************************************************************************/

import { HttpMethods, IAwdRestResources } from './models/awd-rest.model';


const XML_CONVERSION_RESOURCES = {
  convertXmlToXsd: {
    urlTemplate: 'xmlconversion/xmltoxsd',
    methods: [HttpMethods.POST]
  },
  convertXmlToJson: {
    urlTemplate: 'xmlconversion/xmltojson',
    methods: [HttpMethods.POST],
  },
  convertJsonToXml: {
    urlTemplate: 'xmlconversion/jsontoxml',
    methods: [HttpMethods.POST],
  },
  convertJsonToYaml: {
    urlTemplate: 'xmlconversion/jsontoyaml',
    methods: [HttpMethods.POST],
  },
  convertYamlToJson: {
    urlTemplate: 'xmlconversion/yamltojson',
    methods: [HttpMethods.POST],
  },
  convertCvtToJson: {
    urlTemplate: 'xmlconversion/csvtojson',
    methods: [HttpMethods.POST],
  },
  convertCsvToXml: {
    urlTemplate: 'xmlconversion/csvtoxml',
    methods: [HttpMethods.POST],
  },
  convertXmlToClass: {
    urlTemplate: 'jaxb/xsdtoobj',
    methods: [HttpMethods.POST],
  },
  convertJSONToClass: {
    urlTemplate: 'jaxb/jsontoobj',
    methods: [HttpMethods.POST],
  }

};

//----

const BASE64_RESOURCES = {
  stringEncode: {
    urlTemplate: 'conversion/stringencode',
    methods: [HttpMethods.POST]
  },
  stringDecode: {
    urlTemplate: 'conversion/stringdecode',
    methods: [HttpMethods.POST],
  },
  urlEncode: {
    urlTemplate: 'conversion/urlencode',
    methods: [HttpMethods.POST],
  },
  urldecode: {
    urlTemplate: 'conversion/urldecode',
    methods: [HttpMethods.POST],
  }

};

//----

const PDF_CONVERSION_RESOURCES = {
  convertWordToPDF: {
    urlTemplate: 'pdfconversion/wordtopdf',
    methods: [HttpMethods.POST]
  },
  convertJpegToPDF: {
    urlTemplate: 'pdfconversion/jpegtopdf',
    methods: [HttpMethods.POST]
  },
  convertHtmlToPDF: {
    urlTemplate: 'pdfconversion/htmltopdf',
    methods: [HttpMethods.POST]
  },
  convertExcelToPDF: {
    urlTemplate: 'pdfconversion/exceltopdf',
    methods: [HttpMethods.POST]
  },
  convertPowerPointToPDF: {
    urlTemplate: 'pdfconversion/pptopdf',
    methods: [HttpMethods.POST]
  }
};

export const AWD_REST_RESOURCES: IAwdRestResources = {
  base64Resources: BASE64_RESOURCES,
  xmlConversionResources:XML_CONVERSION_RESOURCES,
  pdfConversionResources:PDF_CONVERSION_RESOURCES
};
