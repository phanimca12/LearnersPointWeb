import { Component, OnInit } from '@angular/core';
import { IHomeData } from '../../interfaces/IHome';
import { HomeService } from '../../../core/services/home.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home-body-default',
  templateUrl: './home-body-default.component.html',
  styleUrls: ['./home-body-default.component.scss']
})
export class HomeBodyDefaultComponent implements OnInit {
  homeItems: IHomeData[];
  constructor(private homeService:HomeService,public router:Router) { }

  ngOnInit(): void {
    this.homeService.getHomeListData().then(data => this.homeItems=data);
  }
  openLink(path:string)
  {
    this.router.navigate(['/'+path]);
  }
}
