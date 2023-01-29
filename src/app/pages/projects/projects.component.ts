import { Component } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {


  projectsData: any

  constructor(private content: ContentService) {
    this.content.projects().subscribe(data => {
      this.content.projects().subscribe({
        next: (res) => {
          this.projectsData = res.data
          console.log(res.data)
        }
      })

    })

  }


  getProjects() {

  }


}
