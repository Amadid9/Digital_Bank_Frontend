import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Erreur De Serveur';

      if (error.error?.message) {
        message = error.error.message;
      }

      alert(message);

      return throwError(() => error);
    })
  );
};
