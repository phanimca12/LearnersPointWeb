import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Base64Headers } from '../../constants/enums/base64-headers';
import { XmlConstants } from '../../constants/enums/xml-headers';
import { Observable, Subscription } from 'rxjs';
import { XMLConversionService } from '../../../core/services/xmlconversion.service';
import xmlFormat from 'xml-formatter';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-xmlchild-container',
  templateUrl: './xmlchild-container.component.html',
  styleUrls: ['./xmlchild-container.component.scss']
})
export class XmlchildContainerComponent implements OnInit {
  @ViewChild(CodemirrorComponent) codeMirrorComponent: CodemirrorComponent;
  @Input() childLabel: String;
  label: String = XmlConstants.GENERATE_XSD;
  headerTitle: String = XmlConstants.XSD_SCHEMA_GENERATOR;
  textareaValue: string = '';
  showResponse = false;
  responseData: string = '';
  getSubcription: Subscription;
  isDisabled: true;
  type: String = XmlConstants.XSD_GENERATOR;
  jsonMode = 'application/ld+json';
  xmlMode = 'application/xml';
  mode = '';
  rating: number;
  csvFile: any = '';
  showTextArea = true;
  showFileUpload = false;
  showButton = true;
  constructor(private xmlConversionService: XMLConversionService, private clipboardService: ClipboardService) { }

  ngOnInit(): void {
    this.headerTitle = this.getHeaderTitle(this.childLabel);
    this.type = this.childLabel;
    this.isDisabled = true;
    this.responseData = '';
    this.textareaValue = '';
    this.mode = 'application/xml'
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.childLabel.currentValue)
      this.headerTitle = this.getHeaderTitle(changes.childLabel.currentValue);
    this.showResponse = false;
    this.responseData = '';
    this.textareaValue = '';
    this.type = changes.childLabel.currentValue;
    this.csvFile = '';
    setTimeout(() => { }, 0);
    this.rating = null;
  }

  getHeaderTitle(title: String): String {
    if (title === 'XSD Generator') {
      this.label = XmlConstants.GENERATE_XSD;
      this.mode = 'application/xml'
      this.showFileUpload = false;
      this.showTextArea = true;
      this.showButton = true;
      return this.headerTitle = XmlConstants.XSD_SCHEMA_GENERATOR;
    }
    else if (title === 'XML to JSON Converter') {
      this.label = XmlConstants.CONVERT_XML_TO_JSON;
      this.mode = 'application/ld+json'
      this.showFileUpload = false;
      this.showTextArea = true;
      this.showButton = true;
      return this.headerTitle = XmlConstants.XML_TO_JSON_CONVERTER
    }
    else if (title === 'JSON to XML Converter') {
      this.label = XmlConstants.CONVERT_JSON_TO_XML
      this.mode = 'application/xml'
      this.showFileUpload = false;
      this.showTextArea = true;
      this.showButton = true;
      return this.headerTitle = XmlConstants.JSON_TO_XML_CONVERTER;
    }
    else if (title === 'JSON to YAML Converter') {
      this.label = XmlConstants.CONVERT_JSON_TO_YAML
      this.mode = 'application/yaml'
      this.showFileUpload = false;
      this.showTextArea = true;
      this.showButton = true;
      return this.headerTitle = XmlConstants.JSON_TO_YAML_CONVERTER;
    }
    else if (title === 'YAML to JSON Converter') {
      this.label = XmlConstants.CONVERT_YAML_TO_JSON
      this.mode = 'application/ld+json'
      this.showFileUpload = false;
      this.showTextArea = true;
      this.showButton = true;
      return this.headerTitle = XmlConstants.YAML_TO_JSON_CONVERTER
    }
    else if (title === 'CSV to XML Converter') {
      this.label = XmlConstants.CONVERT_CSV_FILE_TO_XML_FILE
      this.mode = 'application/xml'
      this.showFileUpload = true;
      this.showTextArea = false;
      this.showButton = false;
      return this.headerTitle = XmlConstants.CSV_TO_XML_CONVERTER
    }

    else if (title === 'CSV to JSON Converter') {
      this.label = XmlConstants.CONVERT_CSV_TO_JSON
      this.mode = 'application/ld+json'
      this.showFileUpload = true;
      this.showTextArea = false;
      this.showButton = false;
      return this.headerTitle = XmlConstants.CSV_TO_JSON_CONVERTER
    }

    else {
      return this.headerTitle = XmlConstants.XSD_SCHEMA_GENERATOR;
    }
  }

  processRequest(type, payload) {
    if (this.getSubcription) {
      this.getSubcription.unsubscribe();
    }
    this.getSubcription = this.getObservableOfResponse(type, payload).subscribe(res => {

      if (this.mode === 'application/xml') {
        this.responseData = xmlFormat(res);
      }
      else {
        this.responseData = res;
      }
    }
    );
    this.showResponse = true;
    this.textareaValue = '';
    setTimeout(() => { }, 0);
  }
  getResponse() {
    const payload =
    {
      "requestData": this.textareaValue
    }
    this.processRequest(this.type, payload);
  }
  getObservableOfResponse(type, body): Observable<string> {
    if (body) {
      type = !type ? XmlConstants.XSD_GENERATOR : type;

      if (type === 'XSD Generator') {
        return this.xmlConversionService.convertXmlToXsd(body);
      }
      else if (type === 'XML to JSON Converter') {
        return this.xmlConversionService.convertXmlToJson(body);
      }
      else if (type === 'JSON to XML Converter') {
        return this.xmlConversionService.convertJsonToXml(body);
      }
      else if (type === 'JSON to YAML Converter') {
        return this.xmlConversionService.convertJsonToYaml(body);
      }
      else if (type === 'YAML to JSON Converter') {
        return this.xmlConversionService.convertYamlToJson(body);
      }
      else if (type === 'CSV to XML Converter') {
        return this.xmlConversionService.convertCsvToXml(body);
      }
      else if (type === 'CSV to JSON Converter') {
        return this.xmlConversionService.convertCsvToJson(body);
      }
      return null;
    }

  }

  uploadFile(event) {
    for (let file of event.files) {
      if (file.type === 'text/csv')
        this.csvFile = file;
    }
    if (this.csvFile)
      this.processRequest(this.type, this.csvFile);
  }
  getRating(event) {
    console.log(event.value);
    this.rating = event.value;
  }

  copyText() {
    const codeMirrorInstance = this.codeMirrorComponent.codeMirror;
    codeMirrorInstance.execCommand('selectAll');
    const selectedText = this.codeMirrorComponent.codeMirror.getSelection();
    if (selectedText) {
      this.clipboardService.copyFromContent(selectedText);
      alert("Text Copied !")
    }
  }

}
