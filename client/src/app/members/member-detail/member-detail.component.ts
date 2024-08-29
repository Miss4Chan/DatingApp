import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs'
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule, TimeagoModule, DatePipe, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  //router outlet
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent; 
  //static true means this will be available once the view is created during the component initialization -- ke bide available vo ngoninit
  //if its false its gonna be available once the component has been initialized 
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  member: Member = {} as Member;
  images: GalleryItem[] = [];

  activeTab?: TabDirective;
  messages: Message[] = [];

  ngOnInit(): void {
    // this.loadMember(); ova se deshava so resolverot ne mora da go praime tuka 
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'],
        this.member && this.member.photos.map(p => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }))
        })
      }
    })
    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }

  onUpdateMessages(event: Message)
  {
    this.messages.push(event);
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading)
      {
        if (messageTab) messageTab.active = true;
      }
    }
  }
  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0 && this.member) {
      this.messageService.getMessageThread(this.member.username).subscribe({
        next: messages => this.messages = messages
      })
    }
  }

  // loadMember() {
  //   const username = this.route.snapshot.paramMap.get('username'); //prashaj go dragan za ova
  //   if (!username) return;
  //   this.memberService.getMember(username).subscribe({
  //     next: member => {
  //       this.member = member
  //       member.photos.map(p => {
  //         this.images.push(new ImageItem({ src: p.url, thumb: p.url }))
  //       })
  //     }
  //   })
  // }
}
