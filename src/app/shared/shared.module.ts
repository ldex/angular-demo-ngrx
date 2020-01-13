import { NgModule } from '@angular/core';

import { HomeComponent } from '@app/shared/components/home.component';
import { AdminComponent } from '@app/shared/components/admin.component';
import { ContactComponent } from '@app/shared/components/contact.component';
import { ErrorComponent } from '@app/shared/components/error.component';
import { MyMaterialModule } from '@app/material/my-material.module';

@NgModule({
    imports: [MyMaterialModule],
    exports: [MyMaterialModule],
    declarations: [
        HomeComponent,
        AdminComponent,
        ContactComponent,
        ErrorComponent
    ],
    providers: [],
})
export class SharedModule { }
