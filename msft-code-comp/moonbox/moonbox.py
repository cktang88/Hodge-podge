file = open('Moon-Box_InputForSubmission_1.txt')
hmap = {}
for line in file:
  line = line.strip()
  if not hmap.get(line):
    hmap[line] = 0
  hmap[line] = hmap[line] + 1
print hmap