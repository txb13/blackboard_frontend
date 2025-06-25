import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export interface Note {
    id?: number;
    title: string;
    content: string;
    author: string;
    color: string ;
    creationDate: string | undefined;
    terminationDate: string | undefined;
    xPosition: number;
    yPosition: number;
    width: number;
    height: number;
}
export default class NoteService {
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

    getNote(id: number): Promise<Note> {
        console.log("GET note", id, "from backend:", BACKEND_URL);
        return axios
            .get(`${BACKEND_URL}/${id}`)
            .then((response) => {
                const note: Note = response.data;
                console.log("GET note:", note);
                return note;
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
    deleteNote(id: number): Promise<void> {
        return axios
             .delete(`${BACKEND_URL}/${id}`)
                .then((response) => {
                console.log("DELETE note:", id);
                return response.data;
            });
    }
    updateNote(note: Note, id: number): Promise<void> {
        return axios
            .put(`${BACKEND_URL}/${note.id}`, note)
            .then((response) => {
                console.log("UPDATE note:", id);
                return response.data;
            });
    }
}
