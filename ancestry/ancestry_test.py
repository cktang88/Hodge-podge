# test ancestry methods
from ancestry import *

print("Testing...")

# create tree
root = Node()
mid = Node("")
mid.addChild(Node("A"))
mid.addChild(Node("B"))
root.addChild(mid)
root.addChild(Node("C"))

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


