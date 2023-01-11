export interface DatasType {
    content: string
    is_completed: boolean
    id: number
}

export interface DetailTaskType {
    id?: string
    content?: string
    created_at?: string
    is_completed?: boolean
    priority?: number
    url?: string
}