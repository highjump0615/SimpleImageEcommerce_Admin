import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-menu-item',
  templateUrl: './sidebar-menu-item.component.html',
  styleUrls: ['./sidebar-menu-item.component.scss']
})
export class SidebarMenuItemComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() link: string;

  @Input() topBorder = false;
  @Input() bottomBorder = true;


  constructor() { }

  ngOnInit() {
  }

}
