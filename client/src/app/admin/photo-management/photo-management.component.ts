import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { Photo } from '../../_models/photo';

@Component({
  selector: 'app-photo-management',
  standalone: true,
  imports: [],
  templateUrl: './photo-management.component.html',
  styleUrl: './photo-management.component.css'
})
export class PhotoManagementComponent implements OnInit{
  //sea tuka treba subs na methods sho gi iame u servis i inject na servis i sig negde za da se chuva photo array
  private adminService = inject(AdminService);
  photos : Photo[] = [];


  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval(){
    this.adminService.getPhotosForApproval().subscribe({
      next: photos => this.photos = photos
    })
  }

  //ova mora da go vidam sho ke praime 
  //na dvata praime splice i delete 1 zatoa shto ne e bitno dali e approved ili ne, nie sakame taa slika da ja trgneme od ovoj array tuka 
  //go praime toa posho ovoj array gi chuva site sliki koi nemaat approval 
  approvePhoto(photoId: number){
    this.adminService.approvePhoto(photoId).subscribe({
      next: () => this.photos.splice(this.photos.findIndex(x => x.id === photoId), 1)
    })
  }

  rejectPhoto(photoId: number){
    this.adminService.rejectPhoto(photoId).subscribe({
      next: () => this.photos.splice(this.photos.findIndex(x => x.id === photoId), 1)
    })
  }
}
