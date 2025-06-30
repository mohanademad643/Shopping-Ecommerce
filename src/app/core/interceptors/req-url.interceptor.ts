import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

let counter = 0;

@Injectable()
export class ReqUrlInterceptor implements HttpInterceptor {
  private spinnerService = inject(NgxSpinnerService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    counter++;
    if (counter === 1) {
      this.spinnerService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        counter--;
        if (counter === 0) {
          this.spinnerService.hide();
        }
      })
    );
  }
}
