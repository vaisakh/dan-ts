import { SQLPreDS } from './sql.pre.ds'

export function generateSQL(ds: SQLPreDS) {
    console.dir('//---  Generated SQL  ---//')
    console.log(`USE ${ds.dbName}`)

    let selectList = dumpList("SELECT", ds.selectFieldList, "TEST")
    let tableList = dumpList("FROM", ds.tableList, "1")
    console.log(selectList, tableList)
    return true
}

function dumpList(prefix: string, list: string[], suffix: string) {
    let ret :string = `${prefix} `
    list.forEach(el => ret += el + ",")
    ret += suffix
    return ret
}
