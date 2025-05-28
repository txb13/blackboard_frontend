import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Note {
    title: string;
    content: string;
    author: string;
    color: string ;
    creationDate: string | undefined;
    terminationDate: string | null;
    xPosition: number;
    yPosition: number;
    width: number;
    height: number;
}
export default class NoteService {
    // TODO: add deleteNote() for removing notes
    // TODO: add updateNote() for changing notes
    getNotes(): Promise<Note[]> {
        console.log("GET notes from backend:", BACKEND_URL);
        return axios
            .get(BACKEND_URL)
            .then((response) => {
                const notes: Note[] = response.data;
                console.log("GET notes:", notes);
                return notes;
            });
    }
    addNote(note: Note): Promise<void> {
        return axios
           .post(BACKEND_URL, note)
            .then((response) => {
                console.log("SET note:", note);
                return response.data;
            });
    }
}
