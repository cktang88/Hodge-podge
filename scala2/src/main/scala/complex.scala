// pure classes, with something resembling constructor

// can declare var inline with param declaration
// default params
class Complex(real: Double = 0, imaginary: Double = 0, var apublicvar: Int = 0) {
  // pretty much same effect, except one is variable, another is func
  var re = real
  def im = imaginary

  // can define these methods WITHOUT arguments (so can refer to them as variables, even though they're funcs
  override def toString : String =
    "" + re + (if (im < 0) "" else "+") + im + "i"

  // type ambiguous, even with scala's type inference
  var myField = 0;
  // specifically declaring to be int
  var myIntField: Int = 0;

  // returns something - accessor
  def getMyField : Int = {
    return this.myField;
  }

  // does not return anything - mutator
  def addToMyField(value: Int) {
    this.myField += value;
  }

  // one is a field, one is a method, looks almost identical
  // difference: field is evaluated once at compile time, method is evaluated every time
  val simpleField = {
    println("Evaluating simpleField")
    42
  }
  def noParameterMethod = {
    println("Evaluating noParameterMethod")
    // note implicit return
    42
  }

  /*
    Note that there are no operators in scala. Addition (+) is the method of Int: (1).+(2).
    The only way to override an existing method is inheritance with override keyword.
    Implicit class allows you to add a new method, but not to override the method that already is there.
    src: https://stackoverflow.com/questions/17271270/is-it-possible-to-override-built-in-operators-in-scala
  */
}

object Runme {
  // making a new starting point...
  def main(args: Array[String]): Unit = {
    var c = new Complex(2.3, 4.5, 3)
    // c.im = 5; // invalid
    println("Imaginary: " + c.im)
    c.re = 5 // valid
    println("Real: " + c.re)
    println("String: " + c.toString)
    c.apublicvar = 4 // valid
    println("public var:" + c.apublicvar)

    // can specify any params in any order, due to default params
    var d = new Complex(apublicvar = 3, imaginary = 3.4)
    println(d)
  }
}
