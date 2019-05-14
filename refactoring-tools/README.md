## if-else-convert

Refactors long if/else chains.
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
if (meetingRegularityRoll > 95) {
  faction.meetingRegularity = "every day, at 5pm sharp";
} else if (meetingRegularityRoll > 90) {
  faction.meetingRegularity = "every other day";
} else if (meetingRegularityRoll > 80) {
  faction.meetingRegularity = "every third day";
} else if (meetingRegularityRoll > 70) {
  faction.meetingRegularity = "every week";
} else if (meetingRegularityRoll > 60) {
  faction.meetingRegularity = "every ten days";
} else if (meetingRegularityRoll > 55) {
  faction.meetingRegularity = "whenever a meeting is called";
} else if (meetingRegularityRoll > 50) {
  faction.meetingRegularity = "once a fortnight";
} else if (meetingRegularityRoll > 45) {
  faction.meetingRegularity = "once every three weeks";
} else if (meetingRegularityRoll > 40) {
  faction.meetingRegularity = "once a month";
} else if (meetingRegularityRoll > 30) {
  faction.meetingRegularity = "whenever a leader calls them";
} else if (meetingRegularityRoll > 20) {
  faction.meetingRegularity =
    "whenever three of the leaders happen to be together";
} else if (meetingRegularityRoll > 10) {
  faction.meetingRegularity = "once in a blue moon";
} else if (meetingRegularityRoll <= 5) {
  faction.meetingRegularity = "at literally any time";
} else {
  faction.meetingRegularity = "when there's an issue that needs discussion";
}
```

Output

```js
// out.js
```
