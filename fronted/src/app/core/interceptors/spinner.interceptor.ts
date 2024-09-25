import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';

import { SpinnerService } from '..';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  spinnerService.show();

  return next(req).pipe(finalize(() => spinnerService.hide()));
};
