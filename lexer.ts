//DBEngine["CONTACTS"].Tables[("CG","CGROYP")].Select[("a*2",CGROUP.b+"Mr")]
import { Token, TokenType } from "./token"

const LETTER = /[a-zA-Z]/
const WHITESPACE = /\s+/

export class Lexer {
    private code: string
    private cursor: number
    private lengthOfCode: number
    private lastString: string

    constructor(code: string) {
        this.code = code
        this.cursor = 0
        this.lengthOfCode = code.length
        this.lastString = ''
    }

    getToken(): Token {
        let token: Token = { value: this.getLastString(), type: TokenType.TOK_ILLEGAL_TOKEN }

        this.skipWhitespace()
        if (this.isEndOfCode())
            return { value: this.getLastString(), type: TokenType.TOK_NULL }

        switch(this.currentChar()) {
            case '[':
                this.cursor++
                token = { value: '[', type: TokenType.TOK_OSQUARE }
                break
            case ']':
                this.cursor++
                token = { value: ']', type: TokenType.TOK_CSQUARE }
                break
            case '.':
                this.cursor++
                token = { value: '.', type: TokenType.TOK_DOT }
                break
            case ',':
                this.cursor++
                token = { value: ',', type: TokenType.TOK_COMMA }
                break
            case '(':
                this.cursor++
                token = { value: '(', type: TokenType.TOK_OPAREN }
                break
            case ')':
                this.cursor++
                token = { value: ')', type: TokenType.TOK_CPAREN }
                break
            case '"':
                let temp = ""
                this.cursor++
                while(this.currentChar() != '"') {
                    temp += this.currentChar()
                    this.cursor++
                }
                this.cursor++
                this.lastString = temp
                token = { value: temp, type: TokenType.TOK_QUOTED_STRING }
                break
            default:
                let str = ""
                if(this.isLetter(this.currentChar)) {                
                    while (this.isCursorBelowLengthOfCode() &&
                    this.currentCharacter().match(/^[a-zA-Z0-9_]/g) !== null) {
                            str += this.currentCharacter()
                            this.cursor++
                        }
                } else {
                    console.log('Invalid token!')
                }

                this.lastString = str
                switch(str) {
                    case 'DBENGINE':
                        token = { value: this.getLastString(), type: TokenType.TOK_DBENGINE }
                        break
                    case 'TABLES':
                        token = { value: this.getLastString(), type: TokenType.TOK_TABLES }
                        break
                    default:
                        token = { value: this.getLastString(), type: TokenType.TOK_UNQUOTED_STRING }
                }
                
        }

        return token
    }

    skipWhitespace() {
        while(this.isCursorBelowLengthOfCode() && this.isWhitespace(this.code[this.cursor])) {
            this.cursor++
        }
    }

    getLastString = () => this.lastString
    isCursorBelowLengthOfCode = (): boolean => this.cursor < this.lengthOfCode
    currentCharacter = () => this.code[this.cursor]
    isEndOfCode = () => this.cursor == this.code.length
    currentChar = () => this.code[this.cursor]
    isLetter = (character: any) => LETTER.test(character)
    isWhitespace = (character: any) => WHITESPACE.test(character)
}