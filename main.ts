import { Parser } from './parser'

function main() {
    const code = 'DBENGINE[CONTACTS].TABLES[("dfd", "efg")]'
    const parser = new Parser(code)
    parser.parse()
}

main()