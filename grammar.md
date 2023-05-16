////////////////////////////////
//
// A Parser for DAN => Data Access Notiation
// We will write E-DAN => Extended DAN with typechecking in the future
// This is a parser which does basic job...can be expanded by 
// consulting SLANG's Parser
//
// ============================ Grammar for Parsing the Following
//
// DBEngine["CONTACTS"].Tables[("CG","CGROYP")].Select[("a*2",CGROUP.b+" Mr")]
//
// =================== A BNF based  (Quasi) Grammar
//
// DBEngine["<NAME>"].Tables[<TableList>].Select[<FieldList>]
// <NAME>:= [A-Za-z][A-Za-z0-9]* | (_[A-Za-z]+ )
// <TableList> := '(' "<NAME>" [, "<NAME>" ]* ')'
// <FieldList> := '(' "<Field>" [,"<Field>"]* ')'
// <Field> := "\"" <AcceptedChars> "\"" [, "\"" <AcceptedChars> "\""]*
//  <AcceptedChars> := ".+*/-%"A-Zals-z0-9"
//
// ======= A Simple Data Structure to act as an Intermediate format
// class SQLPreDS
// {
//   public:
//		string dbname;
//		List<string> tablenames;
//		List<string> select_fieldlists;
// };
//
//============== The Whole grammar can be divided into Lexer and Parser 
//============== as given below
//
// Lexical Analyzer
// -----------------
//	<AcceptedChars> := ".+*/-%"A-Za-z0-9"
//	<NAME>:= [A-Za-z][A-Za-z0-9]* | (_[A-Za-z]+ )
//	
// Parser 
// --------------------
//	<Field> := "\"" <AcceptedChars> "\"" [, "\"" <AcceptedChars> "\""]*
//	<FieldList> := '(' "<Field>" [,"<Field>"]* ')'
//	<TableList> := '(' "<NAME>" [, "<NAME>" ]* ')'
//	DBEngine["<NAME>"].Tables[<TableList>].Select(<FieldList>)
//
//