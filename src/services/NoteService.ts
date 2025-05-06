import axios from 'axios'

interface Note {
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
    getNotes(): Promise<Note[]> {
        return axios
            .get('http://localhost:8080/notes')
            .then((response) => {
                const notes: Note[] = response.data;
                console.log("GET notes:", notes);
                return notes;
            });
    }
    addNote(note: Note): Promise<void> {
        return axios
            .post('http://localhost:8080/notes', note)
            .then(() => {
                console.log("SET note:", note);
            });
    }

}