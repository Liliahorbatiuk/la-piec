import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/shared/classes/discount.model';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  adminDiscounts: Array<IDiscount> = [];
  discoundID: number | string;
  discountTitle: string;
  discountText: string;
  discountImage = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg';
  editStatus = false;

  uploadPercent: Observable<number>;

  constructor(private discService: DiscountService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    // this.getAdminDiscount();
    this.getJSONAdminDiscounts();
  }

  getAdminDiscount(): void {
    this.adminDiscounts = this.discService.getDiscounts();
  }

  getJSONAdminDiscounts(): void {
    this.discService.getJSONDiscounts().subscribe(
      data => {
        this.adminDiscounts = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  addAdminDiscount(): void {
    const newD = new Discount(1, this.discountTitle, this.discountText, this.discountImage);
    // if (this.adminDiscounts.length > 0){
    //   newD.id = +this.adminDiscounts.slice(-1)[0].id + 1;
    // }
    delete newD.id;
    console.log(newD);
    // this.discService.setDiscounts(newD);
    this.discService.postJSONDiscount(newD).subscribe(() => {
      this.getJSONAdminDiscounts();
    });
    this.resetForm();
    console.log(this.adminDiscounts);
  }

  deleteAdminDiscount(discount: IDiscount): void {
    // this.discService.deleteDiscount(discount.id);
    this.discService.deleteJSONDiscount(discount).subscribe(() => {
      this.getJSONAdminDiscounts();
    });
  }

  editAdminDiscount(discount: IDiscount): void {
    this.discoundID = discount.id;
    this.discountTitle = discount.title;
    this.discountText = discount.text;
    this.editStatus = true;
  }

  saveEditAdminDiscount(): void {
    const updD = new Discount(this.discoundID,
                              this.discountTitle,
                              this.discountText,
                              this.discountImage);
    this.discService.updateJSONDiscount(updD).subscribe(() => {
      this.getJSONAdminDiscounts();
    });
    this.resetForm();
    this.editStatus = false;
  }

  private resetForm(): void {
    this.discountTitle = '';
    this.discountText = '';
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    console.log(file, filePath);
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.uploadPercent = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.discountImage = url;
        console.log(this.discountImage);
      });
    });
  }
}
