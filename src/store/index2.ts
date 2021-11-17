import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const store = {
    //record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => { recordListModel.create(record) },

    //tag store
    tagList: tagListModel.fetch(),
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === "duplicated") {
            window.alert("该标签已存在");
        } else if (message === "success") {
            window.alert("添加成功");
        }
    },
    removeTag: (id: string) => {
        return tagListModel.remove(id)
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },
    findTag(id: string) {
        return this.tagList.filter((t) => t.id === id)[0];
    }
}
export default store