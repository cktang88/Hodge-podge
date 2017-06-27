// pure classes, with something resembling constructor
class Complex(real: Double, imaginary: Double) {
  def re() = real
  def im() = imaginary

  override def toString: String = re().toString + "+" + im().toString + "i"
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
    print(c)
  }
}
