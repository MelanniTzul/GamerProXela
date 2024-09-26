import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent
],
  templateUrl: './report.component.html',
})
export class ReportComponent {

  private reportService = inject(ReportService);

}
