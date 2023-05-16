export class SQLPreDS {
    public dbName: string
    public tableList = Array<string>()
    public selectFieldList = Array<string>()

    constructor(
        dbName: string = '',
        tableList: string[] = [],
        selectFieldList: string[] = []) {
            
        this.dbName = dbName
        this.tableList = tableList
        this.selectFieldList = selectFieldList
    }
    
}