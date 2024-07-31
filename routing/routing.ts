import { Component } from '@angular/core';
import { HomePageComponent } from 'projects/learners-point-app/src/app/core/components/home-page/home-page.component';
import { Base64ChildContainerComponent } from 'projects/learners-point-app/src/app/shared/components/base64-child-container/base64-child-container.component';
import { Base64ConversionMasterComponent } from 'projects/learners-point-app/src/app/shared/components/base64-conversion-master/base64-conversion-master.component';
import { FormatterComponent } from 'projects/learners-point-app/src/app/shared/components/formatter/formatter.component';
import { FormatterchildComponent } from 'projects/learners-point-app/src/app/shared/components/formatterchild/formatterchild.component';
import { HomeBodyDefaultComponent } from 'projects/learners-point-app/src/app/shared/components/home-body-default/home-body-default.component';
import { PDFConversionChildComponent } from 'projects/learners-point-app/src/app/shared/components/pdfconversion-child/pdfconversion-child.component';
import { PDFConversionMasterComponent } from 'projects/learners-point-app/src/app/shared/components/pdfconversion-master/pdfconversion-master.component';
import { XmlConversionMasterComponent } from 'projects/learners-point-app/src/app/shared/components/xml-conversion-master/xml-conversion-master.component';
import { XmlViewerComponent } from 'projects/learners-point-app/src/app/shared/components/xml-viewer/xml-viewer.component';
import { GenerateObjectBaseComponent } from 'projects/learners-point-app/src/app/shared/components/generate-object-base/generate-object-base.component';
import { GenerateObjectChildComponent } from 'projects/learners-point-app/src/app/shared/components/generate-object-child/generate-object-child.component';
import { MergePdfContainerComponent } from 'projects/learners-point-app/src/app/shared/components/merge-pdf-container/merge-pdf-container.component';
import { EditPdfComponent } from 'projects/learners-point-app/src/app/shared/components/edit-pdf/edit-pdf.component';

export const ApplicationRoutes = [
	{
		path: 'base64master',
		component: Base64ConversionMasterComponent,
		children: [{ path: 'base64child', component: Base64ChildContainerComponent }]
	},
	{ path: 'home', component: HomeBodyDefaultComponent },
	{ path: '', component: HomeBodyDefaultComponent },
	{
		path: 'xmlconversion',
		component: XmlConversionMasterComponent,
		children: [{ path: 'xmlviewer', component: XmlViewerComponent }]
	},
	{
		path: 'bformatter',
		component: FormatterComponent,
		children: [{ path: 'cformatter', component: FormatterchildComponent }]
	},
	{
		path: 'basegenerator',
		component: GenerateObjectBaseComponent,
		children: [{ path: 'childgenerator', component: GenerateObjectChildComponent }]
	},
	{
		path: 'basepdfConverter',
		component: PDFConversionMasterComponent,
		children: [{ path: 'pdfchild', component: PDFConversionChildComponent }]
	},
	{
		path: 'mergePDFContainer',
		component: MergePdfContainerComponent,
		children: [{ path: 'pdfchild', component: PDFConversionChildComponent }]
	},
	{
		path: 'editPDFContainer',
		component: EditPdfComponent,
		children: [{ path: 'pdfchild', component: PDFConversionChildComponent }]
	},
];