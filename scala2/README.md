# Scala Journey

### Best sources
* [Essential Scala](http://underscore.io/training/courses/essential-scala/)
* [StackOverflow Scala wiki](https://stackoverflow.com/tags/scala/info)
* When in doubt, check the [Scala official API](http://www.scala-lang.org/api/2.12.2/)

### Notes
Scala changes EXTREMELY quickly. Always be up to date on docs.

Eg. dramatic changes in Array representation in Scala 2.8:
[Scala Docs - Arrays](http://docs.scala-lang.org/overviews/collections/arrays.html)

Type hierarchy:
![Type hierarchy]('./type-hierarchy.PNG')

### Specific
* Although types optional, it's a good idea to define it to check errors at compile time.
* Difference between 'val' and 'var': val is "final", var is not.
* Default type for an ambiguous "var" is "Any", which is the grand supertype of all Scala types.
If type ambiguous, Scala chooses their closest common ancestor.
* Why no "i++" in Scala - https://stackoverflow.com/questions/4520463/why-no-i-in-scala
