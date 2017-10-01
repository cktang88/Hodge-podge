/**
 *  Fixed size hash map
 */
public class FSHashMap {

    // the size of the hash map (fixed)
    private final int size;
    // number of items in hash map
    private int numItems = 0;
    // entries of hashmap
    private final Object[] values;
    // corresponding keys
    private final String[] keys;

    // return an instance of the class with pre-allocated space for the given number of Vs.
    public FSHashMap(int size){
        if(size<=0){
            throw new IllegalArgumentException("Size should be positive.");
        }
        this.size = size;
        this.values = new Object[size];
        this.keys = new String[size];
    }

    /* stores the given key/value pair in the hash map.
     * Returns a boolean value indicating success / failure of the operation.
     */
    public boolean set(String key, Object value){

        // if table full, fail
        if(numItems>=this.size){
            return false;
        }
        // increment counter if hash occupies new slot
        if(get(key)==null) {
            numItems++;
        }
        // add to hash table, override on collision (could have also used quadratic skip, double hashing, chaining)
        int index = hash(key);
        values[index] = value;
        keys[index] = key;

        return true;
    }

    // Returns value associated with the given key, or null if no value is set.
    public Object get(String key){
        int index = hash(key);
        // if collision, but not same key, return null
        if(keys[index]==null || !keys[index].equals(key))
            return null;
        return values[index];
    }

    /* Deletes the value associated with the given key,
     * returning the value on success or null if the key has no value.
     */
    public Object delete(String key){
        Object value = get(key);

        // if object exists, delete
        if(value!=null){
            int index = hash(key);
            values[index] = null;
            keys[index] = null;
            // update counter
            numItems--;
        }
        return value;
    }

    /* hashes string key to an array index */
    private int hash(String key){
        return key.hashCode()%size;
    }

    /* Returns a float value representing the load factor (`(items in hash map)/(size of hash map)`)
     * of the data structure. Since the size of the data structure is fixed, always <=1
     */
    public float load(){
        return numItems==size ? 1 : (float) numItems / (float) size;
    }

}
