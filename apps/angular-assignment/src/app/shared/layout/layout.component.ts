import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  DoCheck,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BooksBillingService } from '../books-billing.service';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, DoCheck {
  opened = true;
  cartCount!: number;
  collectionCount!: number;

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  constructor(
    private BillingService: BooksBillingService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 65;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 65;
      this.opened = true;
    }
  }
  ngDoCheck(): void {
    this.cartCount = this.cartService.cartItems.length;
    this.collectionCount = this.BillingService.purchasedBooks.length;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 65;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 65;
      this.opened = true;
    }
  }

  isBiggerScreen(): boolean {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
}
