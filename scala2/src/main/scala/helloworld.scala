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
    println("Today is " + (df format now) + ".") // same as df.format(now)

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
    myArray = Array.fill(3) {
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
    // best iteration, using idiomatic Scala
    myArray map println

    // dicts
    val some_mapping = Map("ST" -> "started", "IP" -> "in progress", "DN" -> "done")
    some_mapping.keys.foreach(key => println(key + "=>" + some_mapping(key)))

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
      println("Count: " + s"${new Counter(10).inc.dec.inc.inc.count}")
    }

    {
      // this acts like a "function" that logs all the things you pass it!
      class LoggedAdder(var amount: Int = 0) {
        // note: Scala lists represent a linked list, immutable (functional paradigm)
        // so kind of hard to add element to END of list; O(n) time
        // instead: add to front, reverse when all elements added
        // Make a list via the companion object factory
        // companion object/class, factory
        var args_log = List[Int]()

        // Naming a method apply affords us a special shortened call syntax: foo.apply(args) becomes foo(args)
        def apply(in: Int): Int = {
          // add to log
          args_log ::= in
          return in + amount
        }

        // method overloading
        def apply(in: Double): Int = {
          val n = math.floor(in).toInt
          args_log ::= n
          return n + amount
        }

        override def toString: String = amount + ""
      }
      val add3 = new LoggedAdder(3)
      add3(2) // shorthand for add3.apply(2)
      add3(8.7)
      add3(5.3)
      add3.args_log.reverse.foreach(i => print(i + ","))

    }

    {
      /*
      Companion objects provide us with a means to associate functionality with a class
      without associating it with any instance of that class. (like Java's static)
      They are commonly used to provide additional constructors.
      */

      class Timestamp(val seconds: Long)
      object Timestamp {
        def apply(hours: Int, minutes: Int, seconds: Int): Timestamp =
          new Timestamp(hours * 60 * 60 + minutes * 60 + seconds)
      }
      println
      println(s"${Timestamp(1, 1, 1).seconds} seconds")

      /*
      A companion object has the same name as its associated class.
      This doesn’t cause a naming conflict because Scala
      has two namespaces: the namespace of values and the namespace of types.
      A companion object must be defined in the same file as the associated class.
      */

      // also:
      val ts = new Timestamp(3000) // type, creating a new class instance
      val ts2 = Timestamp(1, 1, 1) // value, = Timestamp.apply(...)

    }

    {
      //Case classes - shorthand for defining a class + companion object + sensible defaults
      case class Person(firstName: String, lastName: String) {
        def name = firstName + " " + lastName
      }
      val dave = new Person("Dave", "Gurnell") // we have a class
      // dave: Person = Person(Dave,Gurnell)
      Person // and a companion object too
      // res: Person.type = Person

      /* Case class default features:
      1. A field for each constructor argument — can omit "val" in our constructor def
      2. human-readable toString(), equals(), hashCode(), copy()
       */

      /* Case companion object default features:
      1. Has "apply" method with the same args as class constructor. Scala programmers
      prefer the apply method over the constructor for the brevity of omiting "new".

       */


    }

  }
}
