## if-else-convert

Refactors long if/else chains.

Conditions:
1. must be an if/else chain
2. Each if body statement must be an assignment
3. Each comparison must be a `>` comparison except the last statement, which can be an `else` statement or a `>` statement.


Usage:

1. Paste original if/else chain into `in.js`

2. Run the converter

```bash
./ifelseconvert
```

3. The output is in `out.js`

Example:

## Input

```js
// in.js
  if (meetingAccessibilityRoll > 95) {
      faction.meetingAccessibility = 'announced well ahead of time and are open to anyone'
  } else if (meetingAccessibilityRoll > 90) {
      faction.meetingAccessibility = 'announced ahead of time and are open to anyone'
  } else if (meetingAccessibilityRoll > 80) {
      faction.meetingAccessibility = 'are open to anyone'
  } else if (meetingAccessibilityRoll > 70) {
      faction.meetingAccessibility = 'are open to senior members'
  } else if (meetingAccessibilityRoll > 60) {
      faction.meetingAccessibility = 'are open to members'
  } else if (meetingAccessibilityRoll > 55) {
      faction.meetingAccessibility = 'are open to people accompanied by a member'
  } else if (meetingAccessibilityRoll > 50) {
      faction.meetingAccessibility = 'are not usually open to non-members'
  } else if (meetingAccessibilityRoll > 45) {
      faction.meetingAccessibility = 'are not open to non-members'
  } else if (meetingAccessibilityRoll > 40) {
      faction.meetingAccessibility = 'are held behind closed doors'
  } else if (meetingAccessibilityRoll > 30) {
      faction.meetingAccessibility = 'are open to those that can find them'
  } else if (meetingAccessibilityRoll > 20) {
      faction.meetingAccessibility = 'are invite-only'
  } else if (meetingAccessibilityRoll > 10) {
      faction.meetingAccessibility = 'closed to all'
  } else if (meetingAccessibilityRoll <= 5) {
      faction.meetingAccessibility = 'closed and held in secret'
  } else {
      faction.meetingAccessibility = 'are open to members';
  }
```

Output

```js
// out.js
const arr = [
    [0, "are open to members"],
    [5, "closed and held in secret"],
    [10, "closed to all"],
    [20, "are invite-only"],
    [30, "are open to those that can find them"],
    [40, "are held behind closed doors"],
    [45, "are not open to non-members"],
    [50, "are not usually open to non-members"],
    [55, "are open to people accompanied by a member"],
    [60, "are open to members"],
    [70, "are open to senior members"],
    [80, "are open to anyone"],
    [90, "announced ahead of time and are open to anyone"],
    [95, "announced well ahead of time and are open to anyone"],
];
faction.meetingAccessibility = arr[0];
for (let [num, descript] in arr)
    if (meetingAccessibilityRoll > num)
        faction.meetingAccessibility = descript;
```
