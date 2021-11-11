const localStorageKeyName = "tagList";
type TagListModel = {
    data: string[]
    fetch: () => string[]
    create: (name: string) => 'success' | "duplicated" //联合类型
    save: () => void
}
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem("tagList") || "[]"); 1
        return this.data
    },
    create(name: string) {
        if (this.data.indexOf(name) >= 0) { return 'duplicated' }
        else {
            this.data.push(name)
            this.save();
            return 'success'
        }

    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
};
export default tagListModel;
