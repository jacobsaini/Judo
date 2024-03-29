import { Component, OnInit,OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { JudoService } from '../services/judo.service'
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [
    trigger('fadein', 
      [
        transition(':enter', [
            style({opacity: 0 }),
            animate('1s ease-out', 
              style({opacity: 1 }))
          ])
      ])]
})
export class DetailsComponent implements OnInit,OnDestroy {
  private unsub: Subject<any> = new Subject();
  move:any;
  video:any;
  safe:any;
  id: any = this.route.snapshot.paramMap.get('id')
  constructor(private judoService:JudoService, private dom: DomSanitizer, private route: ActivatedRoute) { }


  ngOnInit() {
    this.judoService.getSingle(this.id).pipe(takeUntil(this.unsub)).subscribe(single =>{
      
      this.move = single
      this.video = this.move[0].video 
      this.safe = this.dom.bypassSecurityTrustResourceUrl(this.video)
     
      
    })

  }

  
  ngOnDestroy(){
    this.unsub.next()
    this.unsub.complete()
    

  }

}
