
file = open('scale.txt')
dict = {}
for line in file:
  line = line.strip()
  line = line.replace('->',':')
  arr = line.split(':')
  time = int(arr[2])

  if arr[0]=='':
    print time
          # put output chars in dict
    for c in arr[1]:
      if not dict.get(c):
        dict[c]=0
      dict[c] = dict[c] + 1
    continue
  
  sumtime = 0
  # process input chars
  for c in arr[0]:
    sumtime += int(dict[c])*time

      # put output chars in dict
  for c in arr[1]:
    if c=='':
      continue
    if not dict.get(c):
      dict[c]=0
    dict[c] = dict[c] + dict.get(arr[0][0])/len(arr[0])
  print sumtime