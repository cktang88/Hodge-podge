# test ancestry methods
from ancestry import *

print("Testing...")

# create tree
# tree1
b1 = Node(Node(name="A"), Node(Node(name="B"), Node(name="C")))
b2 = Node(Node(name="D"), Node(name="E"))
root = Node(b1, b2)
# tree2
# root = Node(Node(name="A"), Node(Node(name="B"), Node(name="C")))
# print(root)

# 1. serialize
ser = serialize(root)[0]
print(ser)
# print(serialize(mid)[0])

# 2. deserialize
de_root = deserialize(ser)
print(de_root)

# TODO: pretty print tree
# eg. https://github.com/clemtoy/pptree/blob/master/pptree/pptree.py

print("Finished.")


