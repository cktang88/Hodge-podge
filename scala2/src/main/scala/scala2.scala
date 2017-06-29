object scala2 {
  def main(args: Array[String]): Unit = {
    {
      /* NESTED CLASSES, CHAINING METHODS */

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

        // private func
        private def secretvar = "boo"

        // protected func
        protected def secretvar2 = "boo2"

        // abstract func (can only be in abstract classes)
        // abstract def asdf;
      }
      // example of chaining methods
      assert(new Counter(10).inc.dec.inc.inc.count == 12)
    }

    {
      /* APPLY KEYWORD */

      // this acts like a "function" that logs all the things you pass it!
      class LoggedAdder(var amount: Int = 0) {
        // note: Scala lists represent a linked list, immutable (functional paradigm)
        // so kind of hard to add element to END of list; O(n) time
        // instead: add to front, reverse when all elements added
        // Make a list via the companion object factory
        // companion object/class, factory
        var args_log = List[Int]()

        // "apply" method shortcut: foo.apply(args) becomes foo(args)
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
      /* COMPANION OBJECTS */

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
      /* CASE CLASSES */

      /* The primary purpose of case classes is to hold immutable data.
         They often have few methods, rarely have side-effects.
         Use regular classes for encapsulation, polymorphism, behaviors.
      */

      //shorthand for defining a class + companion object + sensible defaults
      case class Person(firstName: String = "", lastName: String = "") {
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



      /* PATTERN MATCHING */

      object Stormtrooper {
        def inspect(person: Person): String =
          person match {
            case Person("Luke", "Skywalker") => "Stop, rebel scum!"
            case Person("Han", "Solo") => "Stop, rebel scum!"
            // underscore matches all
            case Person(first, _) => s"Move along, $first."
          }
      }
      println(Stormtrooper.inspect(Person("Noel", "Welsh")))
      // res: String = Move along, Noel
      println(Stormtrooper.inspect(Person("Han", "Solo")))
      // res: String = Stop, rebel scum!

      val email = "(.*)@(.*)".r // Define a regex for the next example.

      // Pattern matching might look familiar to the switch statements in the C family
      // of languages, but this is much more powerful. In Scala, you can match much
      // more, and fall-through DOES NOT HAPPEN
      def matchEverything(obj: Any): String = obj match {
        // match values:
        case "Hello world" => "lame!"
        // match by type:
        case x: Double => "Got a Double: " + x
        // specify conditions:
        case x: Int if x > 10000 => "Got a pretty big number!"
        // match case classes as before:
        case Person => s"Found a person!"
        // match regular expressions:
        case email(name, domain) => s"Got email address $name@$domain"
        // match tuples:
        case (a: Int, b: Double, c: String) => s"Got a tuple: $a, $b, $c"
        // match data structures:
        case List(1, b, c) => s"Got a list with three elements and starts with 1: 1, $b, $c"
        // nest patterns:
        case List(List((1, 2, "YAY"))) => "Got a list of list of tuple"
        // Match any case (default) if all previous haven't matched
        case _ => "Got unknown object"
      }

      assert(matchEverything("Hello world") == "lame!")
      assert(matchEverything("asdf@gmail.com").startsWith("Got email"))
      assert(matchEverything(List(1, 2, 3)).startsWith("Got a list"))

      // you can pattern match any object with an "unapply" method. This
      // feature is so powerful that you can define functions/fields as
      // patterns:
      val patternFunc: Person => String = {
        case Person("George", _) => "hi george"
        case Person(firstName, lastName) => "stranger"
      }
      assert(patternFunc(Person(firstName = "notgeorge")) == "stranger")
      assert(patternFunc(Person(firstName = "George")) == "hi george")

    }

    {
      /* RETURN KEYWORD */

      // The return keyword exists in Scala, but it only returns from the inner-most
      // def that surrounds it.
      // WARNING: Using return in Scala is error-prone and should be avoided.
      // It has NO effect on anonymous functions. For example:
      def foo(x: Int): Int = {
        val anonFunc: Int => Int = { z =>
          if (z > 5)
            return z // This line makes z the return value of foo!
          else
            z + 2 // This line is the return value of anonFunc
        }
        anonFunc(x) + 1 // This line is the return value of foo
      }

      assert(foo(5) == 8) // 5+2+1 = 8
      assert(foo(6) == 6) // makes z the return value of foo!! (to fix, don't use return statements)
    }

    {
      /* FUNCTIONAL PARADIGM */

      /* map vs foreach
         map: collection => collection
         foreach: collection => Unit (designed to execute functions with side-effects)
       */

      List(1, 2, 3) map (x => x + 10)
      // shorthand: underscore symbol can be used if only one arg, bound to variable
      List(1, 2, 3) map (_ + 10)
      // If the anonymous block AND the function you are applying both take one
      // argument, you can even omit the underscore and parens
      (5 to 1 by -2) foreach println

      // filter
      var a = List(1, 3, 5).filter(_ <= 3)
      assert(a == List(1, 3))
      // reduce to find sum
      val sum = a.reduce(_ + _)
      assert(sum == 4)
      // reduce to find max
      val m = List(1, 3, 4, 792, 3, 2, 1)
      assert(m.reduceLeft((x, y) => x max y) == 792)


      // For-comprehensions
      // the if-statement is called a "guard"
      // is not a for-loop b/c returns a list, represents relationship between two sets of data
      val evens_squared = for (i <- List.range(1, 10) if i % 2 == 0) yield i * i
      assert(evens_squared == List(4, 16, 36, 64))

    }
    {
      /* IMPLICITS */

      // implicits can be used to extend existing classes!

      // Any value (vals, functions, objects, etc) can be declared to be implicit
      // doesn't change behavior...
      class Dog(val breed: String) {
        def bark = "No i won't bark."
      }
      implicit val myImplicitInt = 100

      implicit def myImplicitFunction(breed: String) = new Dog("Golden " + breed)


      // these values are now used when another piece of code "needs" an implicit value.
      def sendGreetings(toWhom: String)(implicit howMany: Int) =
        s"Hello $toWhom, $howMany blessings to you and yours!"

      println(sendGreetings("Jane")) // => "Hello Jane, 100 blessings to you and yours!"

      //what happens if more than one implicit ints???


      // 1. Implicit function parameters enable us to simulate type classes in other
      // functional languages. It is so often used that it gets its own shorthand. The
      // following two lines mean the same thing:
      // def foo[T](implicit c: C[T]) = ...
      // def foo[T : C] = ...


      // 2. If you call obj.method(...) but "obj" doesn't have "method" as a method:
      // if there is an implicit conversion of type A => B, where A is the type of obj, and B has a
      // method called "method", that conversion is applied. So having
      // myImplicitFunction above in scope, we can say:
      assert("Retriever".breed == "Golden Retriever") // => "Golden Retriever"
      assert("Sheperd".bark == "No i won't bark.") // => "Woof, woof!"
      // in the above, the strings are IMPLICITLY converted to Dog objects using the previous implicit func!
    }
  }
}
