import axios from 'axios'

export interface Note {
    title: string;
    content: string;
    author: string;
    id: number;
    color: string | null;
    creationDate: string | null;
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
        return axios
            // .get('https://blackboard-backend-hd9c.onrender.com/notes')
            .get('http://localhost:8080/notes')
            .then((response) => {
                const notes: Note[] = response.data;
                console.log("GET notes:", notes);
                return notes;
            });
    }
    addNote(note: Note): Promise<void> {
        return axios
            // .post('https://blackboard-backend-hd9c.onrender.com/notes', note)
            .post('http://localhost:8080/notes', note)
            .then((response) => {
                console.log("SET note:", note);
                return response.data;
            });
    }

}
