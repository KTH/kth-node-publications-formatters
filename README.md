# kth-node-publications-formatters
This is a utility library for formatting publications in publications-web/api

## Note on the formatters
The idea with all these formatters is the same. You get a publication object and append properties to a tmp string depending on certain conditions
which vary with the publication type and reference style (APA, IEEE, etc)
It is infeasible to guess how it should look, therefore as soon as David Scheutz or someone else gives feedback on the format a test case should be
constructed to make sure that future changes don't break existing formats.
