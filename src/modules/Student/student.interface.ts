
export interface SubjectsMarks{
    bangla: string,
    english: string,
    math: string
}

export interface IStudent{
    name: string,
    roll: number,
    class: string,
    section: string,
    relagion: string,
    averageNumber: number,
    SchoolName: string,
    subjectsMarks: Array<SubjectsMarks> | undefined
}

