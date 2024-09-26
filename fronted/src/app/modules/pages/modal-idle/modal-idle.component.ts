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
  imports: [CommonModule, MatDialogClose],
  templateUrl: './modal-idle.component.html',
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
