type RecordItem = {
    type: string;
    notes: string;
    number: number;
    tag: string[];
    createdAt?: Date; //类/构造函数
}
type Tag = {
    id: string;
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | "duplicated" //联合类型
    update: (id: string, name: string) => 'success' | 'notFound' | 'duplicated'
    save: () => void
    remove: (id: string) => boolean
}

