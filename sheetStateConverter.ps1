<# Load from sheetState.txt into a variable #>
$a = Get-Content .\sheetState.txt -Raw
<# Replace all " with escaped versions #>
$a = $a -replace "`"", "\`""
<# Replace tabulator with seperation between columns/cells #>
$a = $a -replace "`t", "`",`""
<# Replace every newline that isn't 3xnewlines with seperation between rows #>
$a = $a -replace "(?<!`r`n)`r`n(?!`r`n)", "`"],`r`n`t`t[`""
<# Replace every 3xnewlines with seperation between sheets #>
$a = $a -replace "`r`n`r`n`r`n", "`"]`r`n`t],`r`n`r`n`r`n`t[`r`n`t`t[`""
<# Add the `sheets =` bit #>
$a = "sheets = `r`n[`r`n`t[`r`n`t`t[`"" + $a + "`"]`r`n`t]`r`n];"
<# Save to sheetState.js (that's a different file) #>
"$a" | out-file -FilePath .\sheetState.js
<# Clean up #>
