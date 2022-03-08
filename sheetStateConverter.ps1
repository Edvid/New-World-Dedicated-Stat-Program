<# Load from sheetState.txt into a variable #>
$a = Get-Content .\sheetState.txt -Raw
<# Replace all " with escaped versions #>
$a = $a -replace "`"", "\`""
<# Replace \r\n\r\n\r\n with seperation between sheets #>
$a = $a -replace "`r`n`r`n`r`n", "`",`""
<# Replace \r\n with seperation between rows #>
$a = $a -replace "`r`n", "\r\n"
<# Replace \t with seperation between columns/cells #>
$a = $a -replace "`t", "\t"
<# Add the `sheets =` bit #>
$a = "sheets = [`"" + $a + "`"];"
<# Save to sheetState.js (that's a different file) #>
"$a" | out-file -FilePath .\sheetState.js
<# Clean up #>
