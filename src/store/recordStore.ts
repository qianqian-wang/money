import clone from "@/lib/clone";

const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecord() {
        this.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
        return this.recordList
    },
    saveRecord() {
        window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
    },
    createRecord(record: RecordItem) {
        const record2: RecordItem = clone(record);
        record2.createdAt = new Date().toISOString();
        this.recordList?.push(record2);
        recordStore.saveRecord()
    },
}
recordStore.fetchRecord();

export default recordStore