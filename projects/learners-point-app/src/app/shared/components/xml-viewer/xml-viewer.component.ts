import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as xml2js from 'xml2js';
import { js_beautify } from 'js-beautify';
import beautify from "xml-beautifier";
import xmlFormat from 'xml-formatter';
@Component({
  selector: 'app-xml-viewer',
  templateUrl: './xml-viewer.component.html',
  styleUrls: ['./xml-viewer.component.scss']
})
export class XmlViewerComponent implements OnInit {
  @Input() xmlData: string; // Input XML data as string
  @ViewChild('myeditor') myEditor: any;
  parsedXml: any;
  treeData: any[] = [];
  constructor() { }
obj;
xmlString=xmlFormat('<root><content><p xml:space="preserve">This is <b>some</b> content.</content></p>');


  

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if (this.xmlData) {
      this.parseXml();
    }
  }

  parseXml(): void {
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    parser.parseString(this.xmlData, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
      } else {
        this.treeData = this.buildTree(result);
      }
    });
  }

  private buildTree(obj: any): any[] {
    const treeNodes: any[] = [];
    this.traverseObject(obj, (key, value) => {
      const node = { text: key };
      if (typeof value === 'object' && value !== null) {
        node['children'] = this.buildTree(value);
      } else {
        node['value'] = value;
      }
      treeNodes.push(node);
    });
    return treeNodes;
  }

  private traverseObject(obj: any, callback: (key: string, value: any) => void): void {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        callback(key, value);
        if (typeof value === 'object' && value !== null) {
          this.traverseObject(value, callback);
        }
      }
    }
  }
  setEditorContent(event) {
    // console.log(event, typeof event);
    console.log(this.obj);
  }


  
}

