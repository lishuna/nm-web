import { JdbPlgBaseService } from './core/services/jdb-plg-base/jdb-plg-base.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JdbPlgToastComponent } from './core/components/jdb-plg-toast/jdb-plg-toast.component';
import { ShowPictureComponent } from './core/components/show-picture/show-picture.component';
import { JdbTabComponent } from './core/components/jdb-plg-tab/jdb-tab.component';
import { FilterSelected } from './core/pipe/filterSelected.pipe.ts.pipe';
import { FilterMoney } from './core/pipe/filterMoney.pipe';
import { FormatSecondsPipe } from './core/pipe/format-seconds.pipe';
const MDL_MODULES = [
  ShowPictureComponent,
  JdbTabComponent,
  FilterSelected,
  FilterMoney,
  FormatSecondsPipe
];
@NgModule({
  imports: [
    CommonModule
  ],
  exports: MDL_MODULES,
  declarations: [JdbPlgToastComponent, ShowPictureComponent, JdbTabComponent, FilterSelected, FilterMoney, FormatSecondsPipe],
  providers: [JdbPlgBaseService],
  entryComponents: [JdbPlgToastComponent, JdbTabComponent]
})
export class JdbPlgUiModule { }
export { JdbPlgBaseService } from './core/services/jdb-plg-base/jdb-plg-base.service';
