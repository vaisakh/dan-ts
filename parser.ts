import { Lexer } from './lexer'
import { Token, TokenType } from './token'
import { SQLPreDS } from './sql.pre.ds'

export class Parser extends Lexer {
    private lastToken: Token
    private currentToken: Token
    private ds: SQLPreDS

    constructor(sourceCode: string) {
        super(sourceCode)
        this.lastToken = { value: this.getLastString(), type: TokenType.TOK_ILLEGAL_TOKEN }
        this.currentToken = { value: this.getLastString(), type: TokenType.TOK_ILLEGAL_TOKEN }
        this.ds = new SQLPreDS()
    }

    getNextToken() {
        this.lastToken = this.currentToken
        this.currentToken = this.getToken()
    }

    parse(): boolean {
        if(!this.isTokenDBEngine()) {
            console.dir({ Expected: TokenType.TOK_DBENGINE, Recieved: this.currentToken })
            return false
        }

        if(!this.parseDBEngine()) return false
        console.dir('Succesfully parsed DBEngine!')

        if(!this.isTokenDot()) {
            console.dir({ Expected: TokenType.TOK_DOT, Recieved: this.currentToken })
            return false
        }

        if(!this.isTokenTables()) {
            console.dir({ Expected: TokenType.TOK_TABLES, Recieved: this.currentToken })
            return false
        }

        if(!this.parseTables()) return false
        console.dir('Succesfully parsed Tables!')

        return true
    }


    parseDBEngine = () => {
        if(!this.isTokenOpenSquareBracket()) {
            console.dir({ Expected: TokenType.TOK_OSQUARE, Recieved: this.currentToken })
            return false
        }
        if(!this.isTokenUnquotedString()) {
            console.dir({ Expected: TokenType.TOK_UNQUOTED_STRING, Recieved: this.currentToken })
            return false
        }
        const dbName = this.getLastString()
        this.ds.dbName = this.getLastString()

        if(!this.isTokenCloseSquareBracket()) {
            console.dir({ Expected: TokenType.TOK_CSQUARE, Recieved: this.currentToken })
            return false
        }

        return true
    }

    parseTables = () => {
        if(!this.isTokenOpenSquareBracket()) {
            console.dir({ Expected: TokenType.TOK_OSQUARE, Recieved: this.currentToken })
            return false
        }
        if(!this.isTokenOParen()) {
            console.dir({ Expected: TokenType.TOK_OPAREN, Recieved: this.currentToken })
            return false
        }
        if(!this.isTokenQuotedString()) {
            console.dir({ Expected: TokenType.TOK_QUOTED_STRING, Recieved: this.currentToken })
            return false
        }
        this.ds.tableList.push(this.getLastString())

        while(this.isTokenComma()) {
            if(this.isTokenQuotedString()) {
                this.ds.tableList.push(this.getLastString())
            } else {
                console.dir('Error in loop.')
            }
        }

        if(this.currentToken.type == TokenType.TOK_CPAREN) {
            console.dir('Finished processing Table List!')
        } else {
            console.dir({ Expected: TokenType.TOK_CPAREN, Recieved: this.currentToken })
            return false
        }

        if(!this.isTokenCloseSquareBracket()) {
            console.dir({ Expected: TokenType.TOK_CSQUARE, Recieved: this.currentToken })
            return false
        }

        return true
    }

    isTokenComma = () => this.expectNext(TokenType.TOK_COMMA)
    isTokenOParen = () => this.expectNext(TokenType.TOK_OPAREN)
    isTokenCParen = () => this.expectNext(TokenType.TOK_CPAREN)
    isTokenTables = () => this.expectNext(TokenType.TOK_TABLES)
    isTokenDot = () => this.expectNext(TokenType.TOK_DOT)
    isTokenUnquotedString = () => this.expectNext(TokenType.TOK_UNQUOTED_STRING)
    isTokenQuotedString = () => this.expectNext(TokenType.TOK_QUOTED_STRING)
    isTokenOpenSquareBracket = () => this.expectNext(TokenType.TOK_OSQUARE)
    isTokenCloseSquareBracket = () => this.expectNext(TokenType.TOK_CSQUARE)
    isTokenDBEngine = () => this.expectNext(TokenType.TOK_DBENGINE)

    expectNext = (token: TokenType) => {
        this.getNextToken()
        // console.dir(this.currentToken)
        if(this.currentToken.type == token) return true
        // console.dir({ Expected: TokenType.TOK_OSQUARE, Recieved: this.currentToken })
        return false
    }
}
