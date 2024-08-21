import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { //vaka ke go staime guardot na poishe routes
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberListComponent }, 
            //za single route da mu staish guard moesh  canActivate: [authGuard] vnare vo routeot
            { path: 'members/:id', component: MemberDetailComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];

