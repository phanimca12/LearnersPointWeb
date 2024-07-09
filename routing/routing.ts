import { Component } from '@angular/core';
import { HomePageComponent } from 'projects/learners-point-app/src/app/core/components/home-page/home-page.component';
import { Base64ChildContainerComponent } from 'projects/learners-point-app/src/app/shared/components/base64-child-container/base64-child-container.component';
import { Base64ConversionMasterComponent } from 'projects/learners-point-app/src/app/shared/components/base64-conversion-master/base64-conversion-master.component';
import { FormatterComponent } from 'projects/learners-point-app/src/app/shared/components/formatter/formatter.component';
import { FormatterchildComponent } from 'projects/learners-point-app/src/app/shared/components/formatterchild/formatterchild.component';
import { HomeBodyDefaultComponent } from 'projects/learners-point-app/src/app/shared/components/home-body-default/home-body-default.component';
import { XmlConversionMasterComponent } from 'projects/learners-point-app/src/app/shared/components/xml-conversion-master/xml-conversion-master.component';
import { XmlViewerComponent } from 'projects/learners-point-app/src/app/shared/components/xml-viewer/xml-viewer.component';
import { GenerateObjectBaseComponent } from 'projects/learners-point-app/src/app/shared/generate-object-base/generate-object-base.component';
import { GenerateObjectChildComponent } from 'projects/learners-point-app/src/app/shared/generate-object-child/generate-object-child.component';

export const ApplicationRoutes = [
    { path: 'base64master', 
    component: Base64ConversionMasterComponent, 
    children: [{ path: 'base64child', component: Base64ChildContainerComponent }] },
    { path: 'home', component: HomeBodyDefaultComponent },
    { path: '', component: HomeBodyDefaultComponent },
    { path: 'xmlconversion', 
    component: XmlConversionMasterComponent, 
    children: [{ path: 'xmlviewer', component: XmlViewerComponent }] },
    { path: 'bformatter', 
    component: FormatterComponent, 
    children: [{ path: 'cformatter', component: FormatterchildComponent }] },
    { path: 'basegenerator', 
    component: GenerateObjectBaseComponent, 
    children: [{ path: 'childgenerator', component: GenerateObjectChildComponent }] },

];