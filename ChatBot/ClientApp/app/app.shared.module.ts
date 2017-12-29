import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { RecetteComponent } from './components/recette/recette.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { CarouselComponent} from './components/chat-dialog/carousel/carousel.component';
import { ChatService } from './chat.service';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        RecetteComponent,
        ChatDialogComponent,
        CarouselComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        Ng2CarouselamosModule,
        BrowserAnimationsModule,
        

        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'recettes', component: RecetteComponent },
            { path: 'chatbot', component: ChatDialogComponent },
            { path: 'carousel', component: CarouselComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    
    providers: [ChatService, CarouselComponent]
})
export class AppModuleShared {
}


