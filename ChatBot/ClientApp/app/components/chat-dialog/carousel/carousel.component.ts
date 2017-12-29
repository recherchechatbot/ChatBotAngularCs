import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style, trigger, state, transition } from '@angular/animations';
import { ChatService, Message } from '../../../chat.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import 'rxjs/add/operator/scan';

@Component({
    //Name of our tag
    selector: 'carousel',
    exportAs: 'carousel',
    //Template for the tag
    templateUrl: './carousel.component.html',
    //Styles for the tag
    styleUrls: ['./carousel.component.css'],
})

//Carousel Component itself
export class CarouselComponent {
    items = [];
    constructor(private chat: ChatService) {
        let len = this.chat.conversation.value.length;
        let message = this.chat.conversation.value[len - 1].content;
        console.log("mon Message: " + JSON.stringify(message));
        //si le message est de type array, alors on pousse la liste des recettes dans items=>Carousel
        if (message.constructor === Array) {
            console.log("mon Message: " + JSON.stringify(message));
            this.items = message;
        }
    }
}

