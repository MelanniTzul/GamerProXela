import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Injector,
  OnDestroy,
  Inject,
  OnInit,
  effect,
  signal,
  untracked,
  inject,
} from '@angular/core';
import {
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-idle',
  standalone: true,
  imports: [CommonModule, MatDialogClose, ModalComponent],
  templateUrl: './modal-idle.component.html',
  styleUrl: './modal-idle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalIdleComponent implements OnInit, OnDestroy {
  public actividad = signal(true);
  private reservado = signal(true);
  private time: any;

  private dialog = inject(MatDialog);

  constructor(
    private injector: Injector,
    private router: Router
  ) {}

  ngOnInit() {
    this.listenToMouseMovement();
    this.metodoInactividad();
  }

  ngOnDestroy() {
    this.removeMouseMovementListener();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    /*
    console.log('Se detectó movimiento del mouse en toda la página:', event);
    // Puedes acceder a las coordenadas del mouse
    console.log('Coordenadas X:', event.clientX);
    console.log('Coordenadas Y:', event.clientY);
    // Tu lógica aquí
    */

    if (this.reservado()) {
      this.actividad.set(true);
    }
  }

  private listenToMouseMovement() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private removeMouseMovementListener() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private metodoInactividad() {
    effect(
      () => {
        if (this.actividad()) {
          if (this.time) {
            clearTimeout(this.time);
          }
          this.time = setTimeout(() => {
            this.reservado.set(false);
            this.openModal();
          }, 1800000);
          untracked(() => {
            this.actividad.set(false);
          });
        }
      },
      { injector: this.injector }
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      //Objeto del workplace
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Refresh') {
        this.reservado.set(true);
        this.actividad.set(true);
      }
      if (result === 'Cerrar') {
        this.reservado.set(false);
        this.actividad.set(false);
        this.router.navigate(['/public/sign-out']);
      }
    });
    dialogRef.disableClose = true;
  }
}
