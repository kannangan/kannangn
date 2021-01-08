import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  link: String;
  constructor() { }
  link1: String;
  link2: String;
  ngOnInit() {
    this.link = '../../assets/images/parrot.gif';
    this.link1 = '../../assets/images/parrot.gif';
    this.link2 = '../../assets/images/tunisiaparrot.gif';
  }
  ImageClick() {
    if (this.link === this.link1) {
      this.link = this.link2;
    } else {
      this.link = this.link1;
    }
  }


}
