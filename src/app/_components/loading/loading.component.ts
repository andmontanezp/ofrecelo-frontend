import { Component, OnInit } from '@angular/core';
import { LoadingService } from "../../_services/loading.service";
import { Subscription } from "rxjs";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loadingStatus.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }


}
