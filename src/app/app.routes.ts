import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotesPageComponent } from './core-theory/pages/notes-page/notes-page.component';
import { NotePageComponent } from './core-theory/pages/note-page/note-page.component';

export const routes: Routes = [
    {
        path: "",
        component: HomePageComponent
    },
    {
        path: "notes",
        component: NotesPageComponent
    },
    {
        path: "notes/:note",
        component: NotePageComponent
    }
];
