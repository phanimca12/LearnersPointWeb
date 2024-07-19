// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd Party Modules
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

// App Modules
import { PrimeNgModule } from 'projects/processor-app/src/app/primeng.module';
import { AwdTranslateConfigModule } from '@awd-ng-lib/util';

// Module Components
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ModelFilterPipe } from './pipes/model-filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { HomeBodyDefaultComponent } from './components/home-body-default/home-body-default.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { Base64ConversionMasterComponent } from './components/base64-conversion-master/base64-conversion-master.component';
import { Base64ChildContainerComponent } from './components/base64-child-container/base64-child-container.component';
import { XmlViewerComponent } from './components/xml-viewer/xml-viewer.component';
import { XmlConversionMasterComponent } from './components/xml-conversion-master/xml-conversion-master.component';
import { FormatterComponent } from './components/formatter/formatter.component';
import { FormatterchildComponent } from './components/formatterchild/formatterchild.component';
import { GenerateObjectBaseComponent } from './generate-object-base/generate-object-base.component';
import { GenerateObjectChildComponent } from './generate-object-child/generate-object-child.component';
import { PDFConversionMasterComponent } from './components/pdfconversion-master/pdfconversion-master.component';
import { PDFConversionChildComponent } from './components/pdfconversion-child/pdfconversion-child.component';
import { ProgresscontainerComponent } from './components/progresscontainer/progresscontainer.component';


@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,
    TranslateModule,
    AngularSvgIconModule,
    AwdTranslateConfigModule,
    FormsModule
  ],
  declarations: [
    DialogComponent,
    DatepickerComponent,
    ListContainerComponent,
    ModelFilterPipe,
    SearchFilterPipe,
    HomeMenuComponent,
    HomeBodyDefaultComponent,
    HomeFooterComponent,
    Base64ConversionMasterComponent,
    Base64ChildContainerComponent,
    XmlViewerComponent,
    XmlConversionMasterComponent,
    FormatterComponent,
    FormatterchildComponent,
    GenerateObjectBaseComponent,
    GenerateObjectChildComponent,
    PDFConversionMasterComponent,
    PDFConversionChildComponent,
    ProgresscontainerComponent
  
  ],
  exports: [
    DialogComponent,
    DatepickerComponent,
    ListContainerComponent,
    ModelFilterPipe,
    SearchFilterPipe
  ],
})
export class SharedModule { }
