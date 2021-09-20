import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/classes/product.model';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  categories: Array<ICategory> = [];
  currentCategory: ICategory;
  categoryName: string;

  adminProducts: Array<IProduct> = [];
  productID: string;
  productName: string;
  productUrlName: string;
  productDescription: string;
  productWeight: string;
  productPrice: number;
  productImage: string;

  editStatus = false;

  uploadProgress: Observable<number>;
  constructor(private catService: CategoriesService,
              private prodService: ProductsService,
              private storage: AngularFireStorage,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  private getCategories(): void {
    // this.catService.getCategories().subscribe(
    //   data => {
    //     this.categories = data;
    //     this.currentCategory = this.categories[0];
    //   }
    // );
    this.catService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categories = data;
    });
  }

  private getProducts(): void {
    // this.prodService.getProducts().subscribe(
    //   data => {
    //     this.adminProducts = data;
    //   }
    // );
    this.prodService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminProducts = data;
    });
  }

  setCategory(): void {
    this.currentCategory = this.categories.filter(cat => cat.name === this.categoryName)[0];
    console.log(this.currentCategory);
  }



  addProduct(): void {
    const newProd = new Product(
      1,
      this.currentCategory,
      this.productName,
      this.productUrlName,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage
    );
    delete newProd.id;
    // this.prodService.postProduct(newProd).subscribe(() => {
    //   console.log('product add success');
    // });
    this.prodService.create(newProd).then(() => {
      console.log('Created new product successfully!');
      this.toastr.success('Hello world!', 'Toastr fun!');
    });
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const upload = this.storage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
      });
    });
  }

  editProduct(product: IProduct): void {
    this.productID = product.id.toString();
    this.currentCategory = product.category;
    this.productName = product.name;
    this.productUrlName = product.urlName;
    this.productDescription = product.description;
    this.productWeight = product.weight;
    this.productPrice = product.price;
    this.productImage = product.image;
    this.editStatus = true;
  }

  updateProduct(): void {
    const currentProd = new Product(
      this.productID,
      this.currentCategory,
      this.productName,
      this.productUrlName,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage,
    );
    delete currentProd.id;
    this.prodService.update(this.productID.toString(), currentProd)
      .then(() => console.log('The product was updated successfully!'))
      .catch(err => console.log(err));
    this.editStatus = false;
  }

  deleteProduct(product: IProduct): void {
    this.prodService.delete(product.id.toString())
      .then(() => {
        console.log('The product was updated successfully!');
      })
      .catch(err => console.log(err));
  }

}
