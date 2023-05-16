// //DBEngine["CONTACTS"].Tables[("CG","CGROYP")].Select[("a*2",CGROUP.b+"Mr")]

// export enum TokenType {
//     TOK_ILLEGAL_TOKEN = 'TOK_ILLEGAL_TOKEN',
//     TOK_DBENGINE = 'TOK_DBENGINE',
//     TOK_UNQUOTED_STRING = 'TOK_UNQUOTED_STRING',
//     TOK_NULL = 'TOK_NULL'
// }

// export interface Token {
//     value: string,
//     type: TokenType
// }

// const LETTER = /[a-zA-Z]/
// const WHITESPACE = /\s+/
// const NUMBER = /^[0-9]+$/
// const ALPHANUMERIC = /^[a-zA-Z0-9]+$/

// const isAlphaNumeric = (character: string): boolean => ALPHANUMERIC.test(character)
// const isNumber = (character: string): boolean => NUMBER.test(character)
// const isLetter = (character: string): boolean => LETTER.test(character)
// const isWhitespace = (character: string): boolean => WHITESPACE.test(character)
// const lengthOfCode = (code: string): number => code.length
// const currentCursor = (cursor: number): number => cursor
// const isCursorBelowLengthOfCode = (cursor: number, code: string): boolean => currentCursor(cursor) < lengthOfCode(code)
// const skipBeginingWhitespace = (code: string) => code.trimStart()
// const isEndOfCode = (cursor: number, code: string) => currentCursor(cursor) == lengthOfCode(code)
// const currentCharacter = (code: string, cursor: number): string => code[cursor]

// //tokenize
// export function lexer(code: string): Token {
//     let cursor: number = 0
//     let token = { value: "", type: TokenType.TOK_ILLEGAL_TOKEN }
    
//     code = skipBeginingWhitespace(code)
//     if (isEndOfCode(cursor, code))
//         return { value: "", type: TokenType.TOK_NULL }

//     switch(currentCharacter(code, cursor)) {
//         case '+':
//             cursor++
//             break
//         default: 
//             let str: string = ""
//             if(isLetter(currentCharacter(code, cursor))) {                
//                 while (isCursorBelowLengthOfCode(cursor, code) &&
//                 currentCharacter(code, cursor).match(/^[a-zA-Z0-9_]/g) !== null) {
//                         str += currentCharacter(code, cursor)
//                         cursor++
//                     }
//             } else {
//                 console.log('Invalid token!')
//             }
//             token = { value: str, type: TokenType.TOK_UNQUOTED_STRING}
//     }

//     console.log(token)
//     return token;
// }

// lexer('    +')

// // console.log(isWhitespace(''))
// // console.log(isCursorBelowLengthOfCode(currentCursor(11), lengthOfCode('skdfl')))

// // const str = " lsdjfldsjf"
// // console.log(str)
// // console.log(skipBeginingWhitespace(str))