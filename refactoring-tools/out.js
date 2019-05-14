const arr = [
	[ 0, "are open to members"],
	[ 5, "closed and held in secret"],
	[ 10, "closed to all"],
	[ 20, "are invite-only"],
	[ 30, "are open to those that can find them"],
	[ 40, "are held behind closed doors"],
	[ 45, "are not open to non-members"],
	[ 50, "are not usually open to non-members"],
	[ 55, "are open to people accompanied by a member"],
	[ 60, "are open to members"],
	[ 70, "are open to senior members"],
	[ 80, "are open to anyone"],
	[ 90, "announced ahead of time and are open to anyone"],
	[ 95, "announced well ahead of time and are open to anyone"],
];
faction.meetingAccessibility= arr[0];
for (let [num, descript] in arr)
	if( meetingAccessibilityRoll > num)
		faction.meetingAccessibility= descript;