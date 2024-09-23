
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from './primeng.module';
import { FieldsetModule, } from 'primeng/fieldset';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HomeMenuComponent } from './shared/components/home-menu/home-menu.component';
import { HomeBodyDefaultComponent } from './shared/components/home-body-default/home-body-default.component';
import { HomeFooterComponent } from './shared/components/home-footer/home-footer.component';
import { Base64ConversionMasterComponent } from './shared/components/base64-conversion-master/base64-conversion-master.component';
import { ApplicationRoutes } from 'routing/routing';
import { RouterModule } from '@angular/router';
import { Base64ChildContainerComponent } from './shared/components/base64-child-container/base64-child-container.component';
import { Base64ConversionService } from './core/services/base64-conversion.service';
import { NotificationService } from './core/services/notification.service';
import { MessageService } from 'primeng/api';
import { XmlViewerComponent } from './shared/components/xml-viewer/xml-viewer.component';
import { XmlConversionMasterComponent } from './shared/components/xml-conversion-master/xml-conversion-master.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/fold/xml-fold';
import { XmlchildContainerComponent } from './shared/components/xmlchild-container/xmlchild-container.component';
import { ListContainerComponent } from './core/components/list-container/list-container.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FileUploadModule } from 'primeng/fileupload';
import { FormatterComponent } from './shared/components/formatter/formatter.component';
import { FormatterchildComponent } from './shared/components/formatterchild/formatterchild.component';
import { GenerateObjectBaseComponent } from './shared/components/generate-object-base/generate-object-base.component';
import { GenerateObjectChildComponent } from './shared/components/generate-object-child/generate-object-child.component';
import { TabViewModule } from 'primeng/tabview';
import { RatingModule } from 'primeng/rating';
import { ClipboardModule } from 'ngx-clipboard';
import { PDFConversionMasterComponent } from './shared/components/pdfconversion-master/pdfconversion-master.component';
import { PDFConversionChildComponent } from './shared/components/pdfconversion-child/pdfconversion-child.component';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgresscontainerComponent } from './shared/components/progresscontainer/progresscontainer.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MergePdfContainerComponent } from './shared/components/merge-pdf-container/merge-pdf-container.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditPdfComponent } from './shared/components/edit-pdf/edit-pdf.component';
import { WebViewerComponent } from './webviewer/webviewer.component';
import WebViewer from '@pdftron/webviewer'
import { DataViewModule } from 'primeng/dataview';
import { ReportIssueComponent } from './shared/components/report-issue/report-issue.component';

import { MegaMenuModule } from 'primeng/megamenu';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppService } from './core/services/app.service';
import { APP_INITIALIZER } from '@angular/core';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
 // return new TranslateHttpLoader(http);
 return new TranslateHttpLoader(http,'/learners-point-app/assets/i18n/', '.json');
}

function initializeApp(appService: AppService) {
  return (): Promise<any> => {
    return appService.initializeApp();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeMenuComponent,
    HomeBodyDefaultComponent,
    HomeFooterComponent,
    Base64ConversionMasterComponent,
    Base64ChildContainerComponent,
    XmlViewerComponent,
    XmlConversionMasterComponent,
    XmlchildContainerComponent,
    ListContainerComponent,
    FormatterComponent,
    FormatterchildComponent,
    GenerateObjectBaseComponent,
    GenerateObjectChildComponent,
    PDFConversionMasterComponent,
    PDFConversionChildComponent,
    ProgresscontainerComponent,
    MergePdfContainerComponent,
    EditPdfComponent,
    WebViewerComponent,
    ReportIssueComponent


  ],
  imports: [
    BrowserModule,
    CodemirrorModule,
    ScrollPanelModule,
    BrowserAnimationsModule,
    FormsModule,
    PrimeNgModule,
    HttpClientModule,
    FieldsetModule,
    PanelModule,
    InputTextareaModule,
    RouterModule.forRoot(ApplicationRoutes),
    FileUploadModule,
    TabViewModule,
    RatingModule,
    ClipboardModule,
    ToastModule,
    DynamicDialogModule,
    ProgressBarModule,
    PdfViewerModule,
    DataViewModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]

      }
    }),
    MegaMenuModule








  ],
  providers: [MessageService, , NotificationService,
    AppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppService],
      multi: true
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
