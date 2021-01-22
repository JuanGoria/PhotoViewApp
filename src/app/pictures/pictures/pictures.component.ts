import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PicturesService } from '../../core/services';
import { PicturesPage, PictureThumbnail } from '../../core/model';

@Component({
  selector: 'pva-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit, OnDestroy {

  constructor(private picturesService: PicturesService) { }

  public picturesPage: PicturesPage = {
    hasMore: true,
    page: 0,
    pageCount: 0,
    pictures: []
  }

  public pictures: PictureThumbnail[] = [];

  private subs: Subscription = new Subscription();

  @HostListener("window:scroll", [])
  onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.picturesPage.hasMore) this.getImagesCollection();
    }
  }

  private getImagesCollection(): void {
    this.subs.add(
      this.picturesService.getImagesCollection(String(this.picturesPage.page + 1)).subscribe({
        next: res => {
          this.picturesPage = res;
          this.pictures.push(...res.pictures)
        }
      })
    );
  }

  ngOnInit(): void {
    this.getImagesCollection();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
