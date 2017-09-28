file = open('Harmony-of-Ones_InputForSubmission_1.txt')

for line in file:
  count = 0
  #skip first line
  if line.find(',')==-1:
    continue;
  arr = line.split(',')
  a = int(arr[0])
  b = int(arr[1])
  while a>0 or b>0:
    if a%2==1 and b%2==1:
      count+=1
    a = int(a/2)
    b = int(b/2)
  print count


