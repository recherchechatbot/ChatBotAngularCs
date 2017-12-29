import { AfterViewInit, Component, ViewEncapsulation, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, Injectable } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
import { Observable } from 'rxjs/Observable';
import { CarouselComponent } from './carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style, trigger, state, transition } from '@angular/animations';
import 'rxjs/add/operator/scan';

@Component({
    selector: 'app-chat-dialog',
    templateUrl: './chat-dialog.component.html',
    styleUrls: ['./chat-dialog.component.css'],
       
})
    
export class ChatDialogComponent implements OnInit {
    messages: Observable<Message[]>;
    formValue: string;
    constructor(public chat: ChatService) {
    }
    ngOnInit() {
        this.messages = this.chat.conversation.asObservable()
            .scan((acc, val) => acc.concat(val));//Acc=total, val=valeur actuelle
        
        console.log("messages");
    }
    sendMessage() {
        this.chat.converse(this.formValue);
        this.formValue = '';
    }
    isString(val1, val2) { return typeof val1 === 'string'; }
}



