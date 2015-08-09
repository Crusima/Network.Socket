# Network.Socket

Module for handling socket requests and responses

The module hooks into the game's socket connection and emits custom events which can be used by other plugins to runs actions on the events.

Currently not all events (by far) are implemented so if you need an specific event just let me know and I will see whether I can add it.

## Usage

The following information is mostly useful for module developers. If you are an end user just install the module as usual.

This module allows you to listen for specific events based on the game's socket stream. The currently implemented events are:

- `Heartbeat` which is fired once when the client sends a heartbeat to the server
- `ClickVillage` which is fired once the user clicks a village on the map
- `ShowVillageInfo` which is fired once the user click the info icon of a village
- `ShowPlayerInfo` which is fired once the player info is loaded somewhere on the screen

In your module you can listen to thse events as follows:

    document.addEventListener('ClickVillage', function(e) {
        console.log(e);
    });
    
Where `e.type` will contain the type of event (whcih will be `ClickVillage` in the example above). And `e.detail` will contain detailed information about the specific event. E.g. for the example above it could look something like:

    {target_id: 8696}
    
Where the id of the village is returned.

