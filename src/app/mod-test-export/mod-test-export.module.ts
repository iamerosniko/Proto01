import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModTestExportComponent } from './mod-test-export.component'
import { ExcelService } from '../com_services/excel.service';

@NgModule({
    declarations:[
        ModTestExportComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        ExcelService
    ],
    exports: [
        ModTestExportComponent
    ]
})

export class TestExportModule {}