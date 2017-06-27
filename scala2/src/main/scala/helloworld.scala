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
    println(c.isInstanceOf[Int]) // is double

    // scala allows nested functions! :)
    // also note anonymous functions, lambda
    def oncePerSecond(callback: () => Unit) {
      //note that b is still defined from parent function closure
      println(b)
      a=0
      while (a<5) { callback(); Thread sleep 100; a+=1;}
    }
    def timeFlies() {
      println("time flies like an arrow...")
    }
    // oncePerSecond(timeFlies);

    // TODO: fix this; doensn't display correctly...
    // ERROR, BUG
    var num = new Complex(2.2, 4.5)
    println(num.toString)

    // technically should have done "var myArray : Array[String] = new Array[String](10);"
    var myArray = new Array[String](10);
    for(i <- 0 until myArray.length){
      println("i is: " + i);
      println("i'th element is: " + myArray(i));
    }
  }
}
