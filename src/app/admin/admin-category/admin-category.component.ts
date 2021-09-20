import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/shared/classes/category.model';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategories: Array<ICategory>;
  categoryID: string;
  categoryName: string;
  categoryUrlName: string;
  categoryIcon = 'urlImage';
  editStatus: boolean;
  category: ICategory;
  modalRef: BsModalRef;
  constructor(private catService: CategoriesService, 
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  openCategoryModal(template: TemplateRef<any>): any {
    this.modalRef = this.modalService.show(template);
  }


  private getCategories(): void {
    this.catService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminCategories = data;
    });
  }

  public addCategory(): void {
    const newCat = new Category(1, this.categoryName, this.categoryUrlName, this.categoryIcon);
    delete newCat.id;
    this.catService.create(newCat).then(() => {
      this.modalRef.hide();
      this.toastr.success('Category add', 'Success');
    });
  }

  public editCategory(template: TemplateRef<any>, category: ICategory): void {
    this.modalRef = this.modalService.show(template);
    this.categoryID = category.id.toString();
    this.categoryName = category.name;
    this.categoryUrlName = category.urlName;
    this.categoryIcon = category.icon;
    this.editStatus = true;
  }

  public saveEditCategory(): void {
    const newCat = new Category(this.categoryID, this.categoryName, this.categoryUrlName, this.categoryIcon);
    this.catService.update(newCat.id.toString(), newCat).then(() => {
      this.modalRef.hide();
      this.getCategories();
      this.toastr.success('Category update', 'Success');
    });
  }

  public deleteCategory(template: TemplateRef<any>, category: ICategory): void {
    this.modalRef = this.modalService.show(template);
    this.categoryID = category.id.toString();
  }

  public deleteSubmit(status: boolean): void {
    if (status) {
      this.catService.delete(this.categoryID).then(() => {
        this.getCategories();
        this.toastr.success('Category delete', 'Success');
      });
    }
    this.modalRef.hide();
    this.categoryID = null;
  }

}
