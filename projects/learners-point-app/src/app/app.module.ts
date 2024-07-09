
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from './primeng.module';
import { FieldsetModule, } from 'primeng/fieldset';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';
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
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {FileUploadModule} from 'primeng/fileupload';
import { FormatterComponent } from './shared/components/formatter/formatter.component';
import { FormatterchildComponent } from './shared/components/formatterchild/formatterchild.component';
import { GenerateObjectBaseComponent } from './shared/generate-object-base/generate-object-base.component';
import { GenerateObjectChildComponent } from './shared/generate-object-child/generate-object-child.component';
import {TabViewModule} from 'primeng/tabview';
import {RatingModule} from 'primeng/rating';
import { ClipboardModule } from 'ngx-clipboard';

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
    ClipboardModule
  

   
  
 


  ],
  providers: [MessageService,,NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
