import math

file = open('PracticeInput.txt')
numtests = int(file.next())
testnum = 0
while testnum < numtests:
  testnum +=1
  arr = file.next().split(' ')
  numgates = int(arr[0])
  # cur position
  pos = int(arr[1])
  gate = 0
  dist = 0
  while gate < numgates:
    gate+=1
    arr2 = file.next().split(' ')
    ymin = int(arr2[0])
    ymax = int(arr2[1])
    k1 = abs(pos-ymin)
    k2 = abs(pos-ymax)
    if k1 < k2:
      pos = ymin
      dist += math.sqrt(k1*k1 + 1)
    else:
      pos = ymax
      dist += math.sqrt(k2*k2 + 1)
  print round(dist,4)