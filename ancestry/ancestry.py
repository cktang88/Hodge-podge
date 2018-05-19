'''
Make a unique string for each creature based on its unique ancestry
Able to be easily serializable, deserializable, shorter than obvious w/ parens

Define: "ancestry tree" is just an upside down binary tree where only the leaves are labeled

Problem:
In a zoo, there are 26 different base species, denoted via A, B, ..., Y, Z, 
all able to mate with each other. For a given mating, the offspring may be an entirely
new species (not one of the original base species).

So define an encoding method, such that the ancestry tree can be computed from a string
for any given creature.


Constraints:
- The encoded string must only use the original symbols denoting the base species, along
with at most ONE delimiter symbol.
- Although a creature can be encoded by more than one string possibly, each string must identify
a unique creature.

Example:
If we had 2 delimter symbols "(" and ")", we could do...
An animal w/ dad = (A mate w/ B) and mom = C can be defined as:
(AB)C
Note that this is same as an animal w/ mom = (A mate w/ B) and dad = C.
However, an animal with dad = A and mom = (B mate w/ C) would be different:
A(BC)


'''
import string

class Node:
    # constructor
    def __init__(self, name=""):
        self.name = name
        self.parent = None
        self.children = []
    # add a child
    def addChild(self, node):
        node.parent = self
        self.children.append(node)

BASE_SPECIES = string.ascii_uppercase
DELIM = ","

'''
Create an ancestral tree structure from a string
'''
def deserialize(s):
    root = Node()
    cur_node = root
    cur_depth = 0
    for i in s:
        if i in BASE_SPECIES:
            newnode = Node(i)
        else:
            # parse delim
            newnode = Node(i)

    # placeholder
    return root

'''
Create a string from an ancestral tree structure
returns (str, max_levels_depth)
'''
def serialize(root):
    res = ""
    [a, b] = root.children
    # recursion
    (left, a_depth) = (a.name,0) if isBase(a) else serialize(a)
    (right, b_depth) = (b.name,0) if isBase(b) else serialize(b)
    depth = max(a_depth, b_depth) + 1
    return (left + DELIM * depth + right, depth)

'''
check if a node represents a base species
'''
def isBase(node):
    # checks that node is named and in base species
    return node.name and node.name in BASE_SPECIES