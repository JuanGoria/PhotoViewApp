import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PicturesService } from './../../../core/services';
import { Picture } from './../../../core/model';

@Component({
  selector: 'pva-pictures-modal',
  templateUrl: './pictures-modal.component.html',
  styleUrls: ['./pictures-modal.component.scss']
})
export class PicturesModalComponent implements OnDestroy {

  @Input() isOpen: boolean = false;

  @Output() whenClose: EventEmitter<any>;
  @Output() whenOpen: EventEmitter<any>;

  public picture: Picture;
  public isLoading = false;

  private subs: Subscription = new Subscription();

  constructor(private picturesService: PicturesService) {
    this.isOpen = false;

    this.whenClose = new EventEmitter<any>();
    this.whenOpen = new EventEmitter<any>();
  }

  public close(): void {
    this.isOpen = false;
    this.whenClose.emit();
  }

  public open(id: string): void {
    this.setPicture(id);

    this.isOpen = true;
    this.whenOpen.emit();
  }

  private setPicture(id: string): void {
    this.isLoading = true;
    this.subs.add(
      this.picturesService.getImage(id).pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => this.picture = res,
        error: () => this.close()
      })
    )
  }

  // TODO, ADD MODAL BUTTONS

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
