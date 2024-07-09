import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PickListModule } from 'primeng/picklist';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

const moduleList = [
  ButtonModule,
  InputTextModule,
  InputTextareaModule,
  DropdownModule,
  CalendarModule,
  CardModule,
  TabViewModule,
  MenuModule,
  DialogModule,
  AccordionModule,
  TooltipModule,
  PanelMenuModule,
  OverlayPanelModule,
  PickListModule,
  TreeTableModule,
  MultiSelectModule,
  ToastModule,
  ContextMenuModule,
  TabMenuModule,
  TreeModule,
  CheckboxModule,
  ProgressSpinnerModule,
  DynamicDialogModule
];

const serviceList = [
  DialogService
]

@NgModule({
  imports: [].concat(moduleList),
  exports: [].concat(moduleList),
  providers: [].concat(serviceList)
})
export class PrimeNgModule { }
