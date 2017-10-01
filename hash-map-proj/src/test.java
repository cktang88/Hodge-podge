
/**
 * Test class
 *
 * note: should not import any external libraries
 */
public class test {
    public static void main(String[] args){
        // test negative size map
        try {
            FSHashMap fsm_empty = new FSHashMap(-1);
        }catch(IllegalArgumentException e){
            print("Exception caught successfully for negative map size.");
        }

        // test zero size map
        try {
            FSHashMap fsm_empty = new FSHashMap(0);
        }catch(IllegalArgumentException e){
            print("Exception caught successfully for zero map size.");
        }


        FSHashMap fsm = new FSHashMap(3);
        assert(fsm.load()==0); // test load

        // test set()
        print("Testing set().");
        assert(fsm.set("a", "apple")==true);
        assert(fsm.set("b", "bear")==true);
        assert(fsm.load()==(float)2/(float)3); // test load

        // test get()
        print("Testing get().");
        assert(fsm.get("a").equals("apple"));
        assert(fsm.get("b").equals("bear"));
        // ensure can't get values for keys that haven't been stored
        assert(fsm.get("q")==null);
        assert(fsm.get("z")==null);

        // test collision behavior
        print("Testing hash collision behavior.");
        assert(fsm.set("a", "ant")==true);
        assert(fsm.get("a")=="ant");
        assert(fsm.load()==(float)2/(float)3); // test load

        // test overloading map
        print("Testing map overloading attempt.");
        assert(fsm.set("c", "chocolate")==true);
        assert(fsm.load()==(float)1);
        assert(fsm.set("d", "donkey")==false);
        assert(fsm.load()==(float)1);

        // test delete
        print("Testing delete.");
        assert(fsm.delete("c").equals("chocolate"));
        assert(fsm.get("c")==null);
        assert(fsm.load()==(float)2/(float)3);
        assert(fsm.delete("a").equals("ant"));
        assert(fsm.delete("b").equals("bear"));
        assert(fsm.delete("d")==null); // test deleting non-existent key
        assert(fsm.delete("q")==null); // test deleting non-existent key
        assert(fsm.load()==(float)0);


        print("All tests passed.");

    }
    // helper methods for easy printing to console
    public static void print(String str){
        System.out.println(str);
    }
    public static void print(Object obj){
        print(obj.toString());
    }
}
