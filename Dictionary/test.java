import java.util.*;
/* Task: replace all instances of emoji with html blocks */
public class test {
  public static void main(String[] args){
    //dict setup
    Map<String , String> dict = new HashMap<>();
    dict.put("lol", "<laughing-html>");
    dict.put(":)", "<smiley-html>");
    dict.put("XD", "<grinning-html>");
    dict.put(":laughing:", "<laughing-html>");
    dict.put(":fireworks:", "<fireworks-html>");

    //test case 1: basic
    test("hello :) :::laughing:fireworks:", dict);
    //test case 2: embedded emojis, to ensure properly switching start position
    test("lol;;;XD :laugh:fireworks:ing:", dict);

    test("XDo", dict);
    // the original emojiReplace fails for these cases
    test("oXD", dict);
    test("XD", dict);
    test("lol", dict);
    test("asdflol", dict);
    test("aasdf:laughing:", dict);
  }
  static void test(String orig, Map<String, String> dict){
    System.out.println("Original-: " + orig);
    System.out.println("Convert-1: " + emojiReplace(orig, dict));
    System.out.println("Convert-2: " + emojiReplace2(orig, dict));
  }

  // new 7/16/2017 - 
  static String emojiReplace2(String text, Map<String, String> dict){
    StringBuilder result = new StringBuilder();
    StringBuilder buffer = new StringBuilder();
    String oldtmpkey = "";
    String tmpkey = "";
    for(int i=0; i<text.length(); i++){
      buffer.append(text.charAt(i));
      //System.out.println(buffer);
      oldtmpkey = tmpkey;
      if(tmpkey.isEmpty())// first key in dict that potentially could match buffer
        tmpkey = getNewCandidateKey(buffer, text.length()-i+1, dict);
      //System.out.println(tmpkey);
      if(tmpkey.isEmpty()){
        if(!oldtmpkey.isEmpty()){
          i -= buffer.length()-1; //backtrack a bit
          buffer.setLength(1); // delete all but first char
        }
        result.append(buffer);
        buffer.setLength(0);
      }
      else if(buffer.toString().equals(tmpkey)){
        result.append(dict.get(tmpkey));
        buffer.setLength(0);
        tmpkey = getNewCandidateKey(buffer, text.length()-i+1, dict);
      }
    }
    return result.toString();
  }
  static String getNewCandidateKey(StringBuilder str, int maxLength, Map<String, String> dict){
    for(String key : dict.keySet()){
      if(key.startsWith(str.toString()) && key.length() <= maxLength) // filter candidates
        return key;
    }
    return "";
  }

  // old - 1/8/2017 - 45 lines, fails some test cases
  static String emojiReplace(String text, Map<String, String> dict){
    int length = 1;
    int start = 0;
    //go through the entire string...
    while(length + start < text.length()) {
      //deep clone
      ArrayList<String> tempkeys = new ArrayList<>();
      for(String key: dict.keySet())
        tempkeys.add(key);
      assert(tempkeys.size()==dict.keySet().size());
      //while there are still candidate matches:
      while (tempkeys.size() > 0) {
        //create a chunk to analyze
        String chunk = text.substring(start, start + length);
        //used to keep track of whether new letter starts a new emoji
        String newletter = text.substring(start + length-1, start + length);
        //remove keys that don't match
        ArrayList<String> garbage = new ArrayList<>();
        //keeps track of whether new character may potentially start a new emoji
        boolean newletterpotential = false;
        for (String key : dict.keySet()) {
          if(key.startsWith(newletter))
            newletterpotential = true;
          if (!key.startsWith(chunk) && tempkeys.contains(key))
            garbage.add(key);
        }
        //recursive
        if(newletterpotential)
          text = text.substring(0, start + length) + emojiReplace(text.substring(start + length, text.length()), dict);
        //workaround for not being able to modify keyset in foreach loop
        for(String key: garbage)
          tempkeys.remove(key);
        //replace text if key found
        if (tempkeys.size() == 1 && tempkeys.contains(chunk)) {
          text = text.substring(0, start) + dict.get(chunk) + text.substring(start + length, text.length());
          break;
        }
        length++; //add another character to chunk
        if(start + length >= text.length()) //ensure not over string length
          break;
      }
      start += length-1; //set new start position
      length=1; //reset length for next chunk
    }
    return text;
  }
}
