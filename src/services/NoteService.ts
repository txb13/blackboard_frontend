import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Note {
    id?: number;
    title: string;
    content: string;
    author: string;
    color: string | null;
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
    getNote(noteId: number): Promise<Note[]> {
        console.log("GET note", noteId, "from backend:", BACKEND_URL);
        return axios
            .get(`${BACKEND_URL}/${noteId}`)
            .then((response) => {
                const notes: Note[] = response.data;
                console.log("GET note:", notes);
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
    deleteNote(id: number): Promise<void> {
        return axios
             .delete(`${BACKEND_URL}/${id}`)
                .then((response) => {
                console.log("DELETE note:", id);
                return response.data;
            });
    }
    // updateNote(note: Note): Promise<void> {
    //     return axios
    //         .put(`${BACKEND_URL}/${note.id}`, note)
    //         .then((response) => {
    //             console.log("UPDATE note:", note);
    //             return response.data;
    //         });
    //}

}
