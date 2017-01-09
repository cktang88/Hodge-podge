/**
 * Created by Apache on 1/8/2017.
 */

import java.util.*;

public class main {

    public static void main(String[] args){

        //dictionary setup
        Map<String , String> dictionary = new HashMap<String, String>();
        dictionary.put("lol", "<laughing-html>");
        dictionary.put(":)", "<smiley-html>");
        dictionary.put("XD", "<grinning-html>");
        dictionary.put(":laughing:", "<laughing-html>");
        dictionary.put(":fireworks:", "<fireworks-html>");


        //System.out.println("Text: ");
        //Scanner s = new Scanner(System.in);
        //String text = s.nextLine();

        //test case 1: basic
        //String text = "hello :) :::laughing:fireworks:";
        //test case 2: embedded emojis, to ensure properly switching start position
        String text = "lol;;;XD :laugh:fireworks:ing:";
        System.out.println("Original text: " + text);
        System.out.println("Converted text: " + emojiReplace(text, dictionary));
    }

    static String emojiReplace(String text, Map<String, String> dictionary){
        int length = 1;
        int start = 0;
        //go through the entire string...
        while(length + start < text.length()) {
            //deep clone
            ArrayList<String> tempkeys = new ArrayList<>();
            for(String key: dictionary.keySet())
                tempkeys.add(key);
            assert(tempkeys.size()==dictionary.keySet().size());


            //while there are still candidate matches:
            while (tempkeys.size() > 0) {

                //create a chunk to analyze
                String chunk = text.substring(start, start + length);
                //used to keep track of whether new letter starts a new emoji
                String newletter = text.substring(start + length-1, start + length);

                //debugging purposes:
                //System.out.println(chunk);
                //System.out.println("temp size: " + tempkeys.size());

                //remove keys that don't match
                ArrayList<String> garbage = new ArrayList<>();
                //keeps track of whether new character may potentially start a new emoji
                boolean newletterpotential = false;
                for (String key : dictionary.keySet()) {
                    if(key.startsWith(newletter))
                        newletterpotential = true;
                    if (!key.startsWith(chunk) && tempkeys.contains(key))
                        garbage.add(key);
                }
                //recursive
                if(newletterpotential)
                    text = text.substring(0, start + length) + emojiReplace(text.substring(start + length, text.length()), dictionary);

                //workaround for not being able to modify keyset in foreach loop
                for(String key: garbage)
                    tempkeys.remove(key);

                //replace text if key found
                if (tempkeys.size() == 1 && tempkeys.contains(chunk)) {
                    text = text.substring(0, start)
                            + dictionary.get(chunk)
                            + text.substring(start + length, text.length());
                    break;
                }

                //add another character to chunk
                length++;
                //ensure not over string length
                if(start + length >= text.length())
                    break;
            }

            //set new start position
            start += length-1;

            //debugging purposes:
            //System.out.println(start);

            //reset length for next chunk
            length=1;

        }
        return text;
    }
}
