import { Parser } from './parser'
import { generateSQL } from './sql.gen'

function main() {
    const code = 'DBENGINE[CONTACTS].TABLES[("CG", "CGROUP")].SELECT[("a*2", "CGROUP.b + \'Mr\'")]'
    const parser = new Parser(code)
    parser.parse()

    const ds = parser.getDS()
    generateSQL(ds)
}

main()