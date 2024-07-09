import { Injectable } from '@angular/core';
import { parse } from 'fast-xml-parser';
import { decode } from 'he';

// export enum AwdFieldFormat {
//   Alphanumeric = 3,
//   NumericText = 5,
//   Number = 2,
//   Currency = 8,
//   Date = 6,
//   Timestamp = 4,
//   Time = 7
// }

const XML_PARSER_OPTIONS = {
  attributeNamePrefix: '@_',
  attrNodeName: 'attr', // default is 'false'
  textNodeName: '#text',
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: '__cdata', // default is 'false'
  cdataPositionChar: '\\c',
  localeRange: '', // to support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  // attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
  tagValueProcessor: (val, tagName) => decode(val), // default is a=>a
};

const SUCCESS = 'success';

@Injectable({
  providedIn: 'root',
})
export class AwdJobApiClientParserService {
  constructor() {}

  // public getQueryParamValue(paramName: string, windowRef: Window): string {
  //   const queryParamString = windowRef.location.search;
  //   const paramItem = queryParamString.slice(1).split('&').find(element => {
  //     return (element.indexOf(paramName) === 0);
  //   });
  //   if (paramItem) {
  //     return paramItem.split('=')[1].replace(new RegExp('%20', 'g'), ' ');
  //   }
  //   return null;
  // }

  public parse(jobName: string, xmlResponse: string): any {
    const json = this.parseXmlToJson(xmlResponse);
    const errors = json[`${jobName}Response`]?.jobReturn?.messages?.errors;
    if (errors) {
      const errMsg = Array.isArray(errors) ? errors[0].error.text : errors.error.text;
      throw new Error(errMsg);
    }
    return this.jobParsers[jobName](json[`${jobName}Response`]);
  }

  private parseXmlToJson(xml: string): any {
    return parse(xml, XML_PARSER_OPTIONS);
  }

  public parseDocDeliveryStateXMLtoJson(xmlInput: string): any {
    return this.parseXmlToJson(xmlInput);
  }

  private jobParsers = {
    tcAJAXGetUserScreenNames: (json) => {
      const res = json.userScreens.userScreen;
      if (!res) {
        return [];
      } else if (!Array.isArray(res)) {
        return [res];
      } else {
        return res;
      }
    },
    tcAJAXGetUserScreenDefinition: (json) => {
      return json.userScreen;
    },
    tcAJAXSaveUserScreenDefinition: () => {
      return SUCCESS;
    },
    tcAJAXDeleteUserScreenDefinition: () => {
      return SUCCESS;
    },
  };

  // public parseXmlToJson2(xml: string): any {
  //   const encodedJson = parse(xml, XML_PARSER_OPTIONS);
  //   const encodedJsonString = JSON.stringify(encodedJson);
  //   const decodedJsonString = this.decodeSpecialCharacterEntities(encodedJsonString);
  //   return JSON.parse(decodedJsonString);
  // }

  // public decodeSpecialCharacterEntities(encodedJson: string): string {
  //   // Decode back 5 XML Entities that has been sent encoded by the backend
  //   return encodedJson
  //     .replace(/&apos;/g, '\'')
  //     .replace(/&quot;/g, '"')
  //     .replace(/&gt;/g, '>')
  //     .replace(/&lt;/g, '<')
  //     .replace(/&amp;/g, '&');
  // }

  // public getAwdFieldFormatValue(label: string): AwdFieldFormat {
  //   label = label.toLowerCase();
  //   switch (label) {
  //     case 'alphabetic':
  //     case 'alphanumeric': {
  //       return AwdFieldFormat.Alphanumeric;
  //     }
  //     case 'numeric text': {
  //       return AwdFieldFormat.NumericText;
  //     }
  //     case 'numeric': {
  //       return AwdFieldFormat.Number;
  //     }
  //     case 'date': {
  //       return AwdFieldFormat.Date;
  //     }
  //     case 'time': {
  //       return AwdFieldFormat.Time;
  //     }
  //     case 'timestamp': {
  //       return AwdFieldFormat.Timestamp;
  //     }
  //     case 'currency': {
  //       return AwdFieldFormat.Currency;
  //     }
  //   }
  // }

  // public parseUserScreenNames(xml: string): any {
  //   const responseObj = this.parseXmlToJson(xml);
  //   let searchBuilderForms;
  //   try {
  //     searchBuilderForms = responseObj.tcAJAXGetUserScreenNamesResponse.userScreens.userScreen;
  //     if (!searchBuilderForms) {
  //       searchBuilderForms = [];
  //     } else if (!Array.isArray(searchBuilderForms)) {
  //       searchBuilderForms = [searchBuilderForms];
  //     }
  //   } catch (err) {
  //     throw new ErrorEvent('unknown error', {
  //       error: new Error('err.message'),
  //       message: 'unknown error has been encountered'
  //     });
  //   }
  //   return searchBuilderForms;
  // }

  // public parseDataDictionary(xml: string): any {
  //   const responseObj = this.parseXmlToJson(xml);
  //   console.log(responseObj);
  //   let dataDictionary;
  //   try {
  //     dataDictionary = responseObj.tcAJAXGetInitDataResponse.dictionary.field;
  //     if (!dataDictionary) {
  //       dataDictionary = [];
  //     } else if (!Array.isArray(dataDictionary)) {
  //       dataDictionary = [dataDictionary];
  //     }
  //   } catch (err) {
  //     throw new ErrorEvent('unknown error', {
  //       error: new Error('err.message'),
  //       message: 'unknown error has been encountered'
  //     });
  //   }
  //   return dataDictionary;
  // }
}
