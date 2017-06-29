// can import java libs (note underscore instead of asterisk)
import java.util.{Date, Locale}
import java.text.DateFormat._

// Rename an import using '=>'
import scala.util.{Random => Rand}

// singleton - declares both a class and an object
// replaces static classes/methods
object scala1 {
  def main(args: Array[String]): Unit = {
    {
      /* BASICS */
      // java interop
      val now = new Date()
      val df = getDateInstance(LONG, Locale.US)
      // infix syntax, as well as templates
      println("Today is " + (df format now) + ".") // same as df.format(now)

      /*
      Scala is a pure object-oriented language - everything is an object,
      including numbers, functions, even operators. No primitives.
      */

      var a = 1 + 2 * 3 / 4 // same as (1).+(((2).*(3))./(x))
      // assertions!
      assert(a == 2)
      val b = 1.+(2)
      assert(b.isInstanceOf[Int])
      val c = 1.0 + 2
      assert(!c.isInstanceOf[Int]) // is double

      // nested functions, anonymous functions/lambda
      def oncePerSecond(callback: () => Unit) {
        //note that a, b is still defined from parent function closure
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

      // Anonymous funcs:
      // also note funcs don't need braces if single expression
      (x: Int) => x * x

      // Unlike defs, input type of anonymous funcs can be omitted if clear.
      // Notice the type "Int => Int" (input = Int, output = Int)
      val sq: Int => Int = x => x * x
      // assertions!
      assert(sq(10) == 100)
    }

    {
      /* CLASSES */

      val c = new Complex(2.3, 4.5, 3)
      // c.im = 5; // invalid
      assert(c.im == 4.5 && c.re == 2.3)
      c.re = 5 // valid
      assert(c.re == 5)
      println("String: " + c.toString)
      c.apublicvar = 4 // valid
      assert(c.apublicvar == 4)

      // can specify any params in any order, due to default params
      val d = new Complex(apublicvar = 3, imaginary = 3.4)
      println(d)
    }

    {
      /* COLLECTIONS */

      // technically should have done "var myArray : Array[String] = new Array[String](10);"
      var myArray = new Array[String](5)
      // note: reassignment error will occur if you try to initialize myArray as a 'val'
      myArray = Array.fill(3) {
        Rand.nextInt(1000).toString
      }
      // note the use of template strings
      // for loop
      for (i <- myArray.indices)
        println(s"$i'th element: " + myArray(i))

      println("-----")
      // foreach loop
      for (i <- myArray)
        println(s"${myArray.indexOf(i)}'th element: " + i)

      // best iteration, using idiomatic Scala
      myArray foreach println

      // MAPS (dictionary)
      val some_mapping = Map("ST" -> "started", "IP" -> "in progress", "DN" -> "done")
      some_mapping.keys.foreach(key => println(key + "=>" + some_mapping(key)))

      // their closest common ancestor is Any, which is the grand supertype of all Scala types.
      if (1 > 2) "alien" else 2001 // type = "Any", value = 2001
      val noelse = if (false) "hello" // type = "Any", value = Unit
      assert(noelse != null && noelse == {}) // not null, = {}


      // idiomatic scala - looping via recursion
      def showNumbersInRange(a: Int, b: Int): String = {
        if (a < b)
          a.toString + " " + showNumbersInRange(a + 1, b)
        else ""
      }

      assert(showNumbersInRange(9, 14) == "9 10 11 12 13 ")

      // recursion pitfall via pattern matching
      // https://stackoverflow.com/questions/23408860/implementing-a-recursive-function-using-pattern-matching


      // tuples
      val divideInts = (x: Int, y: Int) => (x / y, x % y, x % y == 0)
      val (div, mod, isMultiple) = divideInts(10, 3)
      assert(div == 3 && mod == 1 && !isMultiple)
    }

    {
      /* MISCELLANEOUS */

      // Input and output

      // To read a file line by line
      import scala.io.Source //import statements work ANYWHERE!!!
      // current working dir is at project base (where build.sbt is)
      Source.fromFile("./src/main/scala/scala1.scala").getLines() foreach println

      import java.io.PrintWriter
      // To write a file use Java's PrintWriter
      val writer = new PrintWriter("myfile.txt")
      writer.write("Writing line for line" + util.Properties.lineSeparator)
      writer.write("Another line here" + util.Properties.lineSeparator)
      writer.close()
    }

  }
}
