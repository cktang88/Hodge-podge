risk
---

Multiplayer Risk turn-based strategy game.
Using http://myjson.com/api

Matchmaking
---
Everyone playing will be on the same game, for simplicity. Since nobody will play anyways. Later use hash-url scheme for different games, invite only.

Updating
---
```
// goal: to minimize bandwidth usage, only needs to be fast enough for turn-based multiplayer games
every 500ms:
    check if 'opponent_changed' flag is true
    if true:
        update state from json api.
    else:
        do nothing
'''