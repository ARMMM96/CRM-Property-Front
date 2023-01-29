import { Component } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {


  constructor(private content: ContentService) {
    this.content.projects().subscribe(data => {
      console.log(data)
    })

  }




}
