// from http://www.scala-lang.org/docu/files/ScalaTutorial.pdf
// can import java libs (note underscore instead of asterisk)
import java.util.{Date, Locale}
import java.text.DateFormat._
import java.text.DateFormat

// singleton - declares both a class and an object
// replaces static classes/methods
object HelloWorld {
  def main(args: Array[String]): Unit = {
    val now = new Date()
    val df = getDateInstance(LONG, Locale.US)
    // note infix syntax
    println("Hello, world! Today is " + (df format now) + ".") // same as df.format(now)

    /*
    Scala is a pure object-oriented language in the sense that everything is an object,
    including numbers or functions. It differs from Java in that respect, since Java distinguishes
    primitive types (such as boolean and int) from reference types, and does
    not enable one to manipulate functions as values.
    */

    var a = 1 + 2 * 3 / 4 // same as (1).+(((2).*(3))./(x))
    println(a) // prints 2
    var b = 1.+(2)
    println(b.isInstanceOf[Int]) // is int because parsed as: (1)(.+)(2) where the . is the method call.
    var c = 1.0 + 2
    println(c.isInstanceOf[Int] // is double

    // scala allows nested functions! :)
    def oncePerSecond(callback: () => Unit) {
      while (true) { callback(); Thread sleep 1000 }
    }
  }
}
