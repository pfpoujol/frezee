import {Component, OnInit, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  slide1 = '/assets/slide1.png';
  slide2 = '/assets/slide2.png';
  slide3 = '/assets/slide3.png';
  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
  }
  async finish() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/');
  }

  next() {
    this.slides.slideNext();
  }

}
