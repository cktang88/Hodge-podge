// pure classes, with something resembling constructor
class Complex(real: Double, imaginary: Double) {
  def re = real

  def im = imaginary

  // can define these methods WITHOUT arguments (so can refer to them as variables, even though they're funcs
  override def toString(): String =
    "" + re + (if (im < 0) "" else "+") + im + "i"

  // type ambiguous, even with scala's type inference
  var myField = 0;
  // specifically declaring to be int
  var myIntField: Int = 0;

  // returns something - accessor
  def getMyField(): Int = {
    return this.myField;
  }

  // does not return anything - mutator
  def addToMyField(value: Int) {
    this.myField += value;
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
    var c = new Complex(2.3, 4.5)
    print(c.toString())
  }
}
