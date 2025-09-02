export interface Subject {
    id: number,
    subject_name: string,
    batchId: number,
    createdAt?: string,
    updatedAt?: string
}

export interface Batch {
    id: number,
    batch_name: string,
    duration: number
}

export interface Batches_Subjects {
    batch_id: number,
    batch_name: string,
    subjects: Subject[]
}

export interface AIChat {
    role: string,
    message: string,
}


export interface Content {
    id: number,
    content_name: string,
    subjectId: number,
    content_url: string,
    type: string,
    uploaded_on: string
}

export interface cont {
    content_id: number,
    content_url: string,
    content_name: string
}

export interface newContent {
    content_name: string,
    type: string,
    content: File[]
}

export interface SubjectContents {
    subject_id: number,
    subject_name: string,
    contents: cont[]

}