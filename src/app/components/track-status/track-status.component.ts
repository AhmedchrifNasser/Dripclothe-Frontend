import {Component, OnInit} from '@angular/core';
import {OrderTrackingService} from "../../services/order-tracking.service";
import {STEP_STATE} from "@angular/cdk/stepper";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {OrderTracker} from "../../models/order-tracker";
import {Order} from "../../models/order";
import {OrderItem} from "../../models/order-item";
import {Customer} from "../../models/customer";
import {Address} from "../../models/address";

@Component({
  selector: 'app-track-status',
  templateUrl: './track-status.component.html',
  styleUrls: ['./track-status.component.css']
})
export class TrackStatusComponent implements OnInit{
  orderId: string = '';  // User's input for the order ID
  //steps!: OrderTracker[];
  order = new Order();
  orderItems!: OrderItem[];
  //inputOrdTrackNumber!: string;
  steps = [
    { label: 'Delivered', description: 'Your order has been delivered.', completed: false },//
    { label: 'Out for Delivery', description: 'Your order is out for delivery.', completed: false },
    { label: 'Transferred to Local Delivery Service', description: 'The package arrived at the main logistics hub for further processing.', completed: false },
    { label: 'Arrived at Hub', description: 'The package has passed the customs inspection.', completed: false },
    { label: 'Customs Clearance Completed', description: 'Your order is on the way.', completed: false },
    { label: 'Arrived at the Airport', description: 'The package arrived at the airport for outbound transport.', completed: false },
    { label: 'Flight Departure', description: 'The package departed the airport on its flight.', completed: false },
    { label: 'Package Waiting for Flight at Airport', description: 'The package was waiting at the airport for its scheduled flight.', completed: false },
    { label: 'Shipped', description: 'Your order is on the way.', completed: false },
    { label: 'Processing', description: 'We are preparing your order.', completed: true },
    { label: 'Order Placed', description: 'Your order has been placed.', completed: true },
  ];
  showInputInterface = true;
  constructor(private trackingService: OrderTrackingService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.order.customer = new Customer();
    this.order.shippingAddress = new Address();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.orderId = params.get('orderTrackingNumber')!;
      if(this.orderId != null ){
        this.showInputInterface = false ;
        this.fetchOrderStatus();
      }

    });

  }

  fetchOrderStatus() {
      this.trackingService.getOrderStatus(this.orderId).subscribe({
        next: (order) => {
          this.showInputInterface = false ;
          this.order = order;
          this.orderItems = this.order.orderItems;
          this.steps = order.orderTrackers;
        },
        error: (err) => {

        }
      });
  }

  /*isStepCompleted(step: any): boolean {
    const currentStep = this.orderStatus.status;
    return step.timestamp <= step.timestamp;
  }*/

  protected readonly STEP_STATE = STEP_STATE;
  testValue = 'hey';
}
