// example  

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
      faction.meetingAccessibility = 'are open to members'
  }
