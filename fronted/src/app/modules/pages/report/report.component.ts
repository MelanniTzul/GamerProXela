import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './report.component.html',
})
export class ReportComponent {

  private reportService = inject(ReportService);

}
