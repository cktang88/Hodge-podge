// from http://www.scala-lang.org/docu/files/ScalaTutorial.pdf
// can import java libs (note underscore instead of asterisk)
import java.util.{Date, Locale}
import java.text.DateFormat._
import java.text.DateFormat

import scala.util.Random

// singleton - declares both a class and an object
// replaces static classes/methods
object HelloWorld {
  def main(args: Array[String]): Unit = {
    // Java interop
    val now = new Date()
    val df = getDateInstance(LONG, Locale.US)
    // note infix syntax
    println("Hello, world! Today is " + (df format now) + ".") // same as df.format(now)

    /*
    Scala is a pure object-oriented language in the sense that everything is an object,
    including numbers, functions, even operators. No primitives.
    */

    var a = 1 + 2 * 3 / 4 // same as (1).+(((2).*(3))./(x))
    println(a) // prints 2
    val b = 1.+(2)
    println(b.isInstanceOf[Int])
    val c = 1.0 + 2
    println(c.isInstanceOf[Int]) // is double

    // scala allows nested functions! :)
    // also note anonymous functions, lambda
    {
      def oncePerSecond(callback: () => Unit) {
        //note that b is still defined from parent function closure
        println(b)
        a = 0
        while (a < 5) {
          callback()
          Thread sleep 100
          a += 1
        }
      }

      def timeFlies() {
        println("time flies like an arrow...")
      }
      // oncePerSecond(timeFlies);
    }

    var num = new Complex(2.2, 4.5, 3)
    println(num.toString)

    // technically should have done "var myArray : Array[String] = new Array[String](10);"
    var myArray = new Array[String](5)
    // note: reassignment error will occur if you try to initialize myArray as a 'val'
    myArray = Array.fill(10) {
      Random.nextInt(1000).toString
    }
    // note the use of template strings
    // for loop
    for (i <- myArray.indices) {
      //myArray(i) = i*2
      println(s"$i'th element is: " + myArray(i))
    }
    println("-----")
    // foreach loop
    for (i <- myArray) {
      println(s"${myArray.indexOf(i)}'th element is: " + i)
    }

    // their closest common ancestor is Any, which is the grand supertype of all Scala types.
    if (1 > 2) "alien" else 2001 // type = "Any", value = 2001
    val noelse = {
      if (false) "hello"
    } // type = "Any", value = Unit
    println(noelse)


    {
      // can declare nested classes, will be defined in scope
      class Counter(var count: Int = 0) {
        def inc: Counter = {
          count += 1
          return this
        }

        def dec: Counter = {
          count -= 1
          return this
        }
      }
      // example of chaining methods
      println(new Counter(10).inc.dec.inc.inc.count)
    }

    {
      // example of using classes like methods via "apply" keyword
      class Adder(var amount: Int = 0) {
        // Naming a method apply affords us a special shortened call syntax: foo.apply(args) becomes foo(args)
        def apply(in: Int): Int = in + amount
        // method overloading
        def apply(in: Double): Int = Math.floor(in + amount).toInt
        override def toString : String = amount + ""
      }
      val add3 = new Adder(3)
      println(add3(2)) // shorthand for add3.apply(2)
      println(add3(8.7))
      println(add3)
    }

  }
}
