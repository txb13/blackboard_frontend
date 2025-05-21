import axios from 'axios'

export interface Note {
    title: string;
    content: string;
    author: string;
    id: number;
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
        return axios
            .get('https://blackboard-backend-hd9c.onrender.com/notes')
            // .get('http://localhost:8080/notes')
            .then((response) => {
                const notes: Note[] = response.data;
                console.log("GET notes:", notes);
                return notes;
            });
    }
    addNote(note: Note): Promise<void> {
        return axios
           .post('https://blackboard-backend-hd9c.onrender.com/notes', note)
       //   .post('http://localhost:8080/notes', note)
            .then((response) => {
                console.log("SET note:", note);
                return response.data;
            });
    }
    deleteNote(id: number): Promise<void> {
        return axios
             .delete(`https://blackboard-backend-hd9c.onrender.com/notes/${id}`)
            //  .delete(`http://localhost:8080/notes/${id}`)
                .then((response) => {
                console.log("DELETE note:", id);
                return response.data;
            });
    }
    updateNote(note: Note): Promise<void> {
        return axios
            // .put(`https://blackboard-backend-hd9c.onrender.com/notes/${note.id}`, note)
            .put(`http://localhost:8080/notes/${note.id}`, note)
            .then((response) => {
                console.log("UPDATE note:", note);
                return response.data;
            });
    }
}
