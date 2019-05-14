/**
Refactors if/else chains
*/

package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
)

func main() {
	const inFile = "in.js"
	const outFile = "out.js"

	b, err := ioutil.ReadFile(inFile) // just pass the file name
	if err != nil {
		fmt.Print(err)
	}

	str := string(b) // convert content to a 'string'
	trimWhitespace := func(s string) string {
		return strings.TrimSpace(s)
	}

	str = trimWhitespace(str)
	if !strings.HasPrefix(str, "if") || !strings.HasSuffix(str, "}") || !strings.Contains(str, "else if") {
		fmt.Println("Invalid format. Must be an if/else chain")
	}

	str = strings.Replace(str, "if (", " ", 1) // replace start
	str = strings.TrimSuffix(str, "}")         // remove end

	str = strings.Replace(str, " '", ` "`, -1) // replace single with double quotes
	str = strings.Replace(str, "'\n", "\"\n", -1)
	str = strings.Replace(str, "';", `";`, -1)
	str = strings.Replace(str, ";", "", -1) // remove semicolons

	conditionVar := strings.Split(str, ">")[0]
	if strings.Contains(str, "} else {") {
		plug := "} else if (" + conditionVar + "> 0) {"
		str = strings.Replace(str, "} else {", plug, 1) // hacky
	}
	// split and tokenize statements
	res := strings.Split(str, "} else if (")
	values := make([]string, 1)
	for i := 0; i < len(res); i++ { // conditionals
		re := regexp.MustCompile("<|>|=")
		arr := re.Split(res[i], -1)

		num := strings.Split(arr[len(arr)-2], ")")[0]
		fmt.Println(num)
		if len(num) == 0 {
			num = "0"
		}
		values = append(values, num)
	}
	assignmentVar := ""
	messages := make([]string, 1)
	for i := 0; i < len(res); i++ { // assignments
		arr := strings.Split(res[i], "=")
		tmp := strings.Split(arr[0], "{")
		if len(tmp) > 0 {
			assignmentVar = trimWhitespace(tmp[len(tmp)-1])
		}
		messages = append(messages, trimWhitespace(arr[len(arr)-1]))
	}

	// create output
	output := "const arr = [\n"
	for i := len(messages) - 1; i > -1; i-- {
		if len(values) > 0 && len(messages[i]) > 0 {
			output += "\t[" + values[i] + ", " + messages[i] + "],\n"
		}
	}
	output += "];\n"
	output += assignmentVar + "= arr[0];\n"
	output += "for (let [num, descript] in arr)\n"
	output += "\t" + "if(" + conditionVar + "> num)\n"
	output += "\t\t" + assignmentVar + "= descript;"

	// write to file, created if doesn't exist
	err = ioutil.WriteFile(outFile, []byte(output), 0644)
	if err != nil {
		fmt.Println(err)
	}

}
