import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToastAlertService {
  sucess(message: string) {
    this.Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  error(message: string) {
    this.Toast.fire({
      icon: 'error',
      title: message,
    });
  }
  info(message: string) {
    this.Toast.fire({
      icon: 'info',
      title: message,
    });
  }
  question(message: string) {
    this.Toast.fire({
      icon: 'question',
      title: message,
    });
  }
  warning(message: string) {
    this.Toast.fire({
      icon: 'warning',
      title: message,
    });
  }

  private Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}
